import { createContext, useContext, useState, useCallback } from 'react';
import { mockVolunteers, mockEvents, mockAlerts, mockMessages, mockDirectMessages } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [events, setEvents] = useState(mockEvents);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [groupMessages, setGroupMessages] = useState(mockMessages);
  const [directMessages, setDirectMessages] = useState(mockDirectMessages);
  const [toasts, setToasts] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

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

  const addGroupMessage = useCallback((text, sender, isAdmin) => {
    const msg = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isAdmin,
    };
    setGroupMessages(prev => [...prev, msg]);
  }, []);

  const addDirectMessage = useCallback((text, sender, isAdmin) => {
    const msg = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isAdmin,
    };
    setDirectMessages(prev => [...prev, msg]);
  }, []);

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

  const addEvent = useCallback((eventData) => {
    const newEvent = { ...eventData, id: Date.now(), assignedVolunteers: [], status: 'upcoming' };
    setEvents(prev => [...prev, newEvent]);
    addToast('Event created successfully!', 'success');
  }, [addToast]);

  const rateVolunteer = useCallback((volunteerId, rating) => {
    setVolunteers(prev => prev.map(v =>
      v.id === volunteerId ? { ...v, rating } : v
    ));
    addToast('Rating submitted!', 'success');
  }, [addToast]);

  const value = {
    user, login, logout,
    volunteers, setVolunteers,
    events, setEvents, addEvent,
    alerts, setAlerts,
    groupMessages, addGroupMessage,
    directMessages, addDirectMessage,
    toasts, addToast,
    emergencyMode, activateEmergency, deactivateEmergency,
    removeVolunteerFromEvent,
    rateVolunteer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
