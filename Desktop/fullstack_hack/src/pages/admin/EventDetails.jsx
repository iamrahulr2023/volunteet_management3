import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { EVENT_TYPES, mockVolunteers } from '../../data/mockData';
import RealMap from '../../components/RealMap';
import StarRating from '../../components/StarRating';
import Modal from '../../components/Modal';
import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Clock, Trash2, UserPlus, ShieldCheck, Filter, Search } from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams();
  const { events, volunteers, removeVolunteerFromEvent, rateVolunteer, addToast } = useApp();
  const navigate = useNavigate();
  const [showAssign, setShowAssign] = useState(false);
  const [assignMode, setAssignMode] = useState('auto');
  const [selectedVols, setSelectedVols] = useState([]);
  const [searchAssign, setSearchAssign] = useState('');

  const event = events.find(e => e.id === parseInt(id));
  if (!event) return <div className="text-center py-20 text-gray-500">Event not found</div>;

  const typeInfo = EVENT_TYPES.find(t => t.value === event.type);
  const assignedVols = volunteers.filter(v => event.assignedVolunteers.includes(v.id));
  const unassignedVols = volunteers.filter(v => !event.assignedVolunteers.includes(v.id));

  const statusStyles = {
    active: { badge: 'badge-green', text: 'Active ✅' },
    out: { badge: 'badge-red', text: 'Out of Boundary ⚠️' },
    removed: { badge: 'badge-gray', text: 'Removed' },
  };

  const handleRemove = (volId) => {
    removeVolunteerFromEvent(event.id, volId);
  };

  const handleAssign = () => {
    addToast(`${selectedVols.length} volunteer(s) assigned successfully!`, 'success');
    setShowAssign(false);
    setSelectedVols([]);
  };

  const filteredUnassigned = unassignedVols
    .filter(v => !searchAssign || v.name.toLowerCase().includes(searchAssign.toLowerCase()))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate('/admin/events')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </button>

      {/* Event Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{event.name}</h1>
              <span className={statusStyles[event.status]?.badge || 'badge-blue'}>{event.status}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {assignedVols.length}/{event.requiredVolunteers}</span>
            </div>
          </div>
          <button onClick={() => setShowAssign(true)} className="btn-primary flex items-center gap-2 shrink-0">
            <UserPlus className="w-4 h-4" /> Assign Volunteers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-1 card">
          <h3 className="font-semibold text-gray-800 mb-4">Event Location</h3>
          <RealMap
            center={[event.lat, event.lng]}
            radius={event.radius}
            markers={assignedVols.filter(v => v.lat && v.lng).map(v => ({ id: v.id, name: v.name, status: v.status, lat: v.lat, lng: v.lng }))}
            showCurrentLocation={true}
            height="280px"
            zoom={14}
          />
          <div className="mt-3 text-sm text-gray-500">
            <p>Radius: <span className="font-semibold text-gray-800">{event.radius}m</span></p>
            <p>Type: <span className="font-semibold text-gray-800">{typeInfo?.label}</span></p>
          </div>
        </div>

        {/* Assigned Volunteers */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary-500" /> Assigned Volunteers ({assignedVols.length})
            </h3>
          </div>
          <div className="space-y-3">
            {assignedVols.length === 0 && (
              <p className="text-gray-400 text-center py-8">No volunteers assigned yet</p>
            )}
            {assignedVols.map(vol => (
              <div key={vol.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    vol.status === 'active' ? 'bg-emerald-500' : vol.status === 'out' ? 'bg-red-500' : 'bg-gray-400'
                  }`}>
                    {vol.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{vol.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{vol.skills.join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={vol.rating} size="sm" readOnly onRate={(r) => rateVolunteer(vol.id, r)} />
                  <span className={statusStyles[vol.status]?.badge || 'badge-gray'}>
                    {statusStyles[vol.status]?.text || vol.status}
                  </span>
                  <button
                    onClick={() => handleRemove(vol.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove volunteer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal isOpen={showAssign} onClose={() => setShowAssign(false)} title="Assign Volunteers" size="lg">
        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button onClick={() => setAssignMode('auto')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${assignMode === 'auto' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
            🤖 Auto Assign
          </button>
          <button onClick={() => setAssignMode('manual')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${assignMode === 'manual' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
            ✋ Manual Assign
          </button>
        </div>

        {assignMode === 'auto' ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">AI-suggested volunteers based on skills, distance, and rating:</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="badge-blue">Skills Match</span>
              <span className="badge-blue">Distance</span>
              <span className="badge-blue">Rating</span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredUnassigned.slice(0, 5).map(vol => (
                <div key={vol.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-semibold">{vol.avatar}</div>
                    <div>
                      <p className="font-medium text-gray-800">{vol.name}</p>
                      <p className="text-xs text-gray-500">{vol.skills.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={vol.rating} size="sm" readOnly />
                    <span className="text-xs text-gray-500">{vol.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={searchAssign} onChange={e => setSearchAssign(e.target.value)} placeholder="Search volunteers..." className="input-field pl-11" />
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredUnassigned.map(vol => (
                <label key={vol.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedVols.includes(vol.id)}
                    onChange={() => setSelectedVols(prev => prev.includes(vol.id) ? prev.filter(i => i !== vol.id) : [...prev, vol.id])}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-300"
                  />
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-semibold">{vol.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{vol.name}</p>
                    <p className="text-xs text-gray-500">{vol.skills.join(', ')}</p>
                  </div>
                  <StarRating rating={vol.rating} size="sm" readOnly />
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
          <button onClick={() => setShowAssign(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleAssign} className="btn-primary">
            {assignMode === 'auto' ? 'Auto Assign Top 5' : `Assign (${selectedVols.length})`}
          </button>
        </div>
      </Modal>
    </div>
  );
}
