import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authAPI, eventsAPI, volunteersAPI } from '../services/api';
import { mockAlerts } from '../data/mockData';
import { io } from 'socket.io-client';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [groupMessages, setGroupMessages] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── Toast helper ─────────────────────────────────────────
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // ─── Auth: Login ──────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    const { data } = await authAPI.login(credentials);
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return data.data.user;
    }
    throw new Error(data.message || 'Login failed');
  }, []);

  // ─── Auth: Signup ─────────────────────────────────────────
  const signup = useCallback(async (userData) => {
    const { data } = await authAPI.signup(userData);
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return data.data.user;
    }
    throw new Error(data.message || 'Signup failed');
  }, []);

  // ─── Auth: Logout ─────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setEvents([]);
    setVolunteers([]);
  }, []);

  // ─── Fetch Events from API ────────────────────────────────
  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await eventsAPI.getAll();
      if (data.success) {
        // Map backend fields to what the frontend expects
        const mapped = data.data.map(ev => ({
          id: ev._id,
          name: ev.title,
          type: ev.type?.toLowerCase(),
          location: ev.title, // location name fallback
          lat: ev.location?.lat,
          lng: ev.location?.lng,
          radius: ev.radius,
          date: ev.dateTime ? new Date(ev.dateTime).toISOString().split('T')[0] : '',
          time: ev.dateTime ? new Date(ev.dateTime).toTimeString().slice(0, 5) : '',
          requiredVolunteers: ev.requiredVolunteers,
          requiredSkills: ev.requiredSkills || [],
          assignedVolunteers: [],
          assignmentMode: ev.assignmentMode,
          status: ev.status,
          _id: ev._id,
        }));
        setEvents(mapped);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }, []);

  // ─── Fetch Volunteers from API ────────────────────────────
  const fetchVolunteers = useCallback(async () => {
    try {
      const { data } = await volunteersAPI.getAll();
      if (data.success) {
        const mapped = data.data.map(v => ({
          id: v._id,
          name: v.name,
          phone: v.phone,
          skills: v.skills || [],
          location: '',
          rating: v.rating || 0,
          status: v.availability ? 'active' : 'inactive',
          avatar: v.name.split(' ').map(n => n[0]).join(''),
          totalHours: 0,
          availability: v.availability ? 'Anytime' : 'Unavailable',
          workload: 'medium',
          lat: v.location?.lat || 0,
          lng: v.location?.lng || 0,
          _id: v._id,
        }));
        setVolunteers(mapped);
      }
    } catch (err) {
      console.error('Error fetching volunteers:', err);
    }
  }, []);

  // ─── Socket Initialization ────────────────────────────────
  const initSocket = useCallback((token) => {
    if (socket) return;
    
    const newSocket = io('/', { auth: { token } });
    
    newSocket.on('connect', () => console.log('Socket connected'));
    
    newSocket.on('notification', (data) => {
      addToast(`New Notification: ${data.message}`, 'info');
      // optionally refresh data
      if (data.type === 'assignment') {
        fetchEvents();
      }
    });

    newSocket.on('location_updated', (data) => {
      // update volunteer location on map
      setVolunteers(prev => prev.map(v => 
        (v.id === data.volunteerId || v._id === data.volunteerId) 
          ? { ...v, lat: data.lat, lng: data.lng, location: { lat: data.lat, lng: data.lng } }
          : v
      ));
    });

    setSocket(newSocket);
    return newSocket;
  }, [addToast, fetchEvents, socket]);

  // ─── On mount: restore session + load data ────────────────
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          await Promise.all([fetchEvents(), fetchVolunteers()]);
          initSocket(token);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    init();
  }, [fetchEvents, fetchVolunteers, initSocket]);

  // ─── Add Event via API ────────────────────────────────────
  const addEvent = useCallback(async (eventData) => {
    try {
      const payload = {
        title: eventData.name,
        type: eventData.type ? eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1) : 'Disaster',
        location: { lat: eventData.lat || 19.076, lng: eventData.lng || 72.877 },
        radius: (eventData.radius || 200) / 1000, // convert m to km
        dateTime: new Date(`${eventData.date}T${eventData.time}`),
        requiredVolunteers: eventData.requiredVolunteers || 1,
        requiredSkills: eventData.requiredSkills || [],
        assignmentMode: eventData.assignmentMode || 'auto',
      };

      const { data } = await eventsAPI.create(payload);
      if (data.success) {
        const ev = data.data;
        const mapped = {
          id: ev._id,
          name: ev.title,
          type: ev.type?.toLowerCase(),
          location: eventData.location || ev.title,
          lat: ev.location?.lat,
          lng: ev.location?.lng,
          radius: ev.radius,
          date: ev.dateTime ? new Date(ev.dateTime).toISOString().split('T')[0] : '',
          time: ev.dateTime ? new Date(ev.dateTime).toTimeString().slice(0, 5) : '',
          requiredVolunteers: ev.requiredVolunteers,
          requiredSkills: ev.requiredSkills || [],
          assignedVolunteers: [],
          assignmentMode: ev.assignmentMode,
          status: ev.status || 'active',
          _id: ev._id,
        };
        setEvents(prev => [mapped, ...prev]);
        addToast('Event created successfully!', 'success');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create event';
      addToast(msg, 'danger');
      throw err;
    }
  }, [addToast]);

  // ─── Remove volunteer from event (local for now) ──────────
  const removeVolunteerFromEvent = useCallback((eventId, volunteerId) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId
        ? { ...e, assignedVolunteers: e.assignedVolunteers.filter(v => v !== volunteerId) }
        : e
    ));
    setVolunteers(prev => prev.map(v =>
      v.id === volunteerId ? { ...v, status: 'removed' } : v
    ));
    addToast('Volunteer removed → auto reassignment triggered', 'warning');
  }, [addToast]);

  // ─── Chat (Mock Direct Messages / Custom handling in Chat.jsx) ───
  // We'll let Chat.jsx manage its message state, but we provide socket
  const addGroupMessage = useCallback((text, sender, isAdmin) => {
    console.log("Send via chatAPI instead");
  }, []);

  const addDirectMessage = useCallback((text, sender, isAdmin) => {
    console.log("Direct msgs local fallback", text);
  }, []);

  // ─── Emergency (local/mock for now) ───────────────────────
  const activateEmergency = useCallback(() => {
    setEmergencyMode(true);
    addToast('🚨 Emergency alert sent to nearby volunteers!', 'danger');
    setAlerts(prev => [{
      id: Date.now(), type: 'emergency',
      message: 'Emergency mode activated — all nearby volunteers alerted',
      time: 'Just now', severity: 'danger'
    }, ...prev]);
  }, [addToast]);

  const deactivateEmergency = useCallback(() => {
    setEmergencyMode(false);
    addToast('Emergency mode deactivated', 'info');
  }, [addToast]);

  // ─── Rating (local for now) ───────────────────────────────
  const rateVolunteer = useCallback((volunteerId, rating) => {
    setVolunteers(prev => prev.map(v =>
      v.id === volunteerId ? { ...v, rating } : v
    ));
    addToast('Rating submitted!', 'success');
  }, [addToast]);

  const value = {
    user, login, logout, signup, loading,
    volunteers, setVolunteers, fetchVolunteers,
    events, setEvents, addEvent, fetchEvents,
    alerts, setAlerts,
    groupMessages, addGroupMessage,
    directMessages, addDirectMessage,
    toasts, addToast,
    emergencyMode, activateEmergency, deactivateEmergency,
    removeVolunteerFromEvent,
    rateVolunteer,
    socket,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
