import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { mockVolunteerEvents } from '../../data/mockData';
import { CalendarDays, MapPin, Clock, Check, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [events, setEvents] = useState(mockVolunteerEvents);
  const navigate = useNavigate();

  const handleAccept = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'accepted' } : e));
    addToast('Event accepted! You can now view the group chat.', 'success');
  };

  const handleReject = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' } : e));
    addToast('Event request rejected.', 'info');
  };

  const pendingEvents = events.filter(e => e.status === 'pending');
  const acceptedEvents = events.filter(e => e.status === 'accepted');

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
              <div key={event.id} className="card border-l-4 border-l-amber-400">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{typeEmojis[event.type]}</span>
                  <span className={statusConfig[event.status]?.badge}>{statusConfig[event.status]?.text}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {event.location}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary-400" /> {event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {event.time}</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleAccept(event.id)} className="btn-success flex-1 flex items-center justify-center gap-2 text-sm py-2">
                    <Check className="w-4 h-4" /> Accept
                  </button>
                  <button onClick={() => handleReject(event.id)} className="btn-danger flex-1 flex items-center justify-center gap-2 text-sm py-2">
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
              <div key={event.id} className="card border-l-4 border-l-emerald-400 cursor-pointer hover:border-l-emerald-500 group"
                   onClick={() => navigate('/volunteer/active-event')}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{typeEmojis[event.type]}</span>
                  <span className="badge-green">Accepted</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
                <div className="space-y-2 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {event.location}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary-400" /> {event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {event.time}</div>
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
