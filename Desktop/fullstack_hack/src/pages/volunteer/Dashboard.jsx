import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { CalendarDays, MapPin, Clock, Check, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assignmentsAPI } from '../../services/api';

const statusConfig = {
  pending: { badge: 'badge-orange', text: 'Pending' },
  accepted: { badge: 'badge-green', text: 'Accepted' },
  rejected: { badge: 'badge-red', text: 'Rejected' },
};

const typeEmojis = {
  disaster: '🆘', food: '🍲', crowd: '👥', medical: '🏥', cleanup: '🧹',
};

export default function VolunteerDashboard() {
  const { addToast } = useApp();
  const navigate = useNavigate();

  const [dbAssignments, setDbAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const { data } = await assignmentsAPI.getMyAssignments();
      if (data.success) {
        setDbAssignments(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch assignments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAccept = async (assignmentId) => {
    try {
      await assignmentsAPI.respond(assignmentId, 'accepted');
      addToast('Event accepted! You can now view the group chat.', 'success');
      fetchAssignments();
    } catch (e) {
      addToast(e.response?.data?.message || 'Failed to accept', 'danger');
    }
  };

  const handleReject = async (assignmentId) => {
    try {
      await assignmentsAPI.respond(assignmentId, 'rejected');
      addToast('Event request rejected.', 'info');
      fetchAssignments();
    } catch (e) {
      addToast(e.response?.data?.message || 'Failed to reject', 'danger');
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: 'N/A', time: 'N/A' };
    const d = new Date(dateString);
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const pendingEvents = dbAssignments.filter(a => a.status === 'pending').map(a => ({ ...a.eventId, assignmentId: a._id }));
  const acceptedEvents = dbAssignments.filter(a => a.status === 'accepted').map(a => ({ ...a.eventId, assignmentId: a._id }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your event assignments</p>
      </div>

      {/* Requested Events */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          📌 Requested Events
          {pendingEvents.length > 0 && (
            <span className="badge-orange">{pendingEvents.length} pending</span>
          )}
        </h2>
        {pendingEvents.length === 0 ? (
          <div className="card text-center py-8 text-gray-400">No pending event requests</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingEvents.map(event => (
              <div key={event._id || event.id} className="card border-l-4 border-l-amber-400">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{typeEmojis[event.type?.toLowerCase()] || '📋'}</span>
                  <span className={statusConfig.pending.badge}>{statusConfig.pending.text}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title || event.name}</h3>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {typeof event.location === 'object' ? `${event.location.lat.toFixed(2)}, ${event.location.lng.toFixed(2)}` : event.location}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary-400" /> {event.dateTime ? formatDateTime(event.dateTime).date : event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {event.dateTime ? formatDateTime(event.dateTime).time : event.time}</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleAccept(event.assignmentId)} className="btn-success flex-1 flex items-center justify-center gap-2 text-sm py-2">
                    <Check className="w-4 h-4" /> Accept
                  </button>
                  <button onClick={() => handleReject(event.assignmentId)} className="btn-danger flex-1 flex items-center justify-center gap-2 text-sm py-2">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accepted Events */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          📌 Accepted Events
        </h2>
        {acceptedEvents.length === 0 ? (
          <div className="card text-center py-8 text-gray-400">No accepted events</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {acceptedEvents.map(event => (
              <div key={event._id || event.id} className="card border-l-4 border-l-emerald-400 cursor-pointer hover:border-l-emerald-500 group"
                   onClick={() => {
                     const transformedEvent = {
                       ...event,
                       name: event.title || event.name,
                       date: event.dateTime ? formatDateTime(event.dateTime).date : event.date,
                       time: event.dateTime ? formatDateTime(event.dateTime).time : event.time,
                       location: typeof event.location === 'object' ? `${event.location.lat.toFixed(4)}, ${event.location.lng.toFixed(4)}` : event.location
                     };
                     navigate('/volunteer/active-event', { state: { event: transformedEvent } });
                   }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{typeEmojis[event.type?.toLowerCase()] || '📋'}</span>
                  <span className="badge-green">Accepted</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title || event.name}</h3>
                <div className="space-y-2 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {typeof event.location === 'object' ? `${event.location.lat.toFixed(2)}, ${event.location.lng.toFixed(2)}` : event.location}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary-400" /> {event.dateTime ? formatDateTime(event.dateTime).date : event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {event.dateTime ? formatDateTime(event.dateTime).time : event.time}</div>
                </div>
                <div className="flex items-center justify-end text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                  View Details <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
