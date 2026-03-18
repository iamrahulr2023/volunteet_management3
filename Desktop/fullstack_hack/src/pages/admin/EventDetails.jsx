import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { EVENT_TYPES } from '../../data/mockData';
import RealMap from '../../components/RealMap';
import StarRating from '../../components/StarRating';
import Modal from '../../components/Modal';
import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Clock, Trash2, UserPlus, ShieldCheck, Filter, Search } from 'lucide-react';

import { useEffect } from 'react';
import { assignmentsAPI } from '../../services/api';

export default function EventDetails() {
  const { id } = useParams();
  const { events, volunteers, removeVolunteerFromEvent, rateVolunteer, addToast, socket } = useApp();
  const navigate = useNavigate();
  const [showAssign, setShowAssign] = useState(false);
  const [assignMode, setAssignMode] = useState('auto');
  const [selectedVols, setSelectedVols] = useState([]);
  const [searchAssign, setSearchAssign] = useState('');
  
  const [dbAssignments, setDbAssignments] = useState([]);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [liveLocations, setLiveLocations] = useState({});

  // Match by string id (MongoDB ObjectId) — support both `id` and `_id`
  const event = events.find(e => String(e.id) === String(id) || String(e._id) === String(id));

  const fetchAssignments = async () => {
    if (!event) return;
    try {
      setLoadingAssign(true);
      const { data } = await assignmentsAPI.getEventAssignments(event._id || event.id);
      if (data.success) {
        setDbAssignments(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch assignments", e);
    } finally {
      setLoadingAssign(false);
    }
  };

  useEffect(() => {
    if (event) {
      fetchAssignments();
      
      // Join assignment update room
      if (socket) {
        const room = `event_assignments_${event._id || event.id}`;
        socket.emit('join_room', room); // Re-use join_room for simple assignment updates
        
        const handleUpdate = (data) => {
          if (String(data.eventId) === String(event._id || event.id)) {
            fetchAssignments();
          }
        };

        const handleLocationUpdate = (data) => {
          console.log('[EventDetails] Received location update:', data);
          if (String(data.eventId) === String(event._id || event.id)) {
            setLiveLocations(prev => ({
              ...prev,
              [data.volunteerId]: { lat: data.lat, lng: data.lng, timestamp: Date.now() }
            }));
          }
        };

        socket.on('assignment_updated', handleUpdate);
        socket.on('location_updated', handleLocationUpdate);
        
        return () => {
          socket.off('assignment_updated', handleUpdate);
          socket.off('location_updated', handleLocationUpdate);
          // Don't leave assignment-specific rooms if it might affect chat rooms
          // Unless we use a dedicated leave_room pattern
        };
      }
    }
  }, [event, socket]);

  if (!event) return <div className="text-center py-20 text-gray-500">Event not found</div>;

  const typeInfo = EVENT_TYPES.find(t => t.value === event.type);
  
  // Calculate assigned IDs purely from database assignments first
  const dbAssignedIds = dbAssignments
    .filter(a => ['pending', 'accepted'].includes(a.status))
    .map(a => String(a.volunteerId?._id || a.volunteerId));

  // Merge with mock context but filter out any that might have been removed in DB
  const removedIds = dbAssignments
    .filter(a => ['rejected', 'removed'].includes(a.status))
    .map(a => String(a.volunteerId?._id || a.volunteerId));

  const assignedIds = [
    ...dbAssignedIds,
    ...(event.assignedVolunteers || []).filter(id => !removedIds.includes(String(id)))
  ];
  
  const assignedVols = volunteers.filter(v => assignedIds.includes(String(v.id)) || assignedIds.includes(String(v._id))).map(vol => {
    const volId = String(vol.id || vol._id);
    const assignment = dbAssignments.find(a => String(a.volunteerId?._id || a.volunteerId) === volId);
    return {
      ...vol,
      assignmentStatus: assignment ? assignment.status : 'accepted'
    };
  });
  const unassignedVols = volunteers.filter(v => (!assignedIds.includes(String(v.id)) && !assignedIds.includes(String(v._id)) && v.status === 'active'));

  const statusStyles = {
    active: { badge: 'badge-green', text: 'Active ✅' },
    inactive: { badge: 'badge-orange', text: 'Inactive' },
    out: { badge: 'badge-red', text: 'Out of Boundary ⚠️' },
    removed: { badge: 'badge-gray', text: 'Removed' },
  };

  const handleRemove = async (volId) => {
    try {
      const match = dbAssignments.find(a => String(a.volunteerId?._id || a.volunteerId) === String(volId));
      if (match) {
        const { data } = await assignmentsAPI.remove(match._id);
        if (data.success) {
          addToast('Volunteer removed from event!', 'success');
          // Refetch to get the latest assignments (including auto-reassignments)
          await fetchAssignments();
        }
      } else {
        removeVolunteerFromEvent(event.id || event._id, volId);
        addToast('Volunteer removed from event', 'success');
      }
    } catch (e) {
      console.error(e);
      addToast('Failed to remove volunteer', 'danger');
    }
  };

  const handleAssign = async () => {
    setLoadingAssign(true);
    try {
      if (assignMode === 'auto') {
        const { data } = await assignmentsAPI.autoAssign(event._id || event.id);
        addToast(`${data.data.length} volunteer(s) auto-assigned successfully!`, 'success');
        setDbAssignments(prev => [...prev, ...data.data]);
      } else {
        const { data } = await assignmentsAPI.manualAssign(event._id || event.id, selectedVols);
        addToast(`${data.data.length} volunteer(s) manually assigned!`, 'success');
        setDbAssignments(prev => [...prev, ...data.data]);
      }
      setShowAssign(false);
      setSelectedVols([]);
    } catch (e) {
      addToast(e.response?.data?.message || 'Assignment failed', 'danger');
    } finally {
      setLoadingAssign(false);
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const filteredUnassigned = unassignedVols
    .filter(v => !searchAssign || v.name.toLowerCase().includes(searchAssign.toLowerCase()))
    .map(v => {
      let score = 0;
      let skillMatchCount = 0;
      if (event.requiredSkills && event.requiredSkills.length > 0) {
        skillMatchCount = v.skills?.filter(s => 
          event.requiredSkills.map(rs => rs.toLowerCase()).includes(s.toLowerCase())
        ).length || 0;
      }
      
      const distance = calculateDistance(v.lat || 0, v.lng || 0, event.lat || 0, event.lng || 0);
      const isWithinDistance = distance <= event.radius;
      
      score += skillMatchCount * 50;
      if (isWithinDistance) score += 20;
      score -= distance;
      score += v.rating * 5;
      
      return { ...v, score, skillMatchCount, distance, isWithinDistance };
    })
    .sort((a, b) => b.score - a.score);

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
        {/* Map */}
        <div className="lg:col-span-1 card">
          <h3 className="font-semibold text-gray-800 mb-4">Event Location</h3>
          <div className="relative z-0">
            <RealMap
              center={[event.lat || 19.076, event.lng || 72.8777]}
              radius={event.radius}
              markers={assignedVols.map(v => {
                const volId = String(v.id || v._id);
                const liveLoc = liveLocations[volId];
                
                // If they don't have a live location yet, fallback to their global location if they have one,
                // or event center as absolute fallback to prevent map crash (though we filter below if no valid loc).
                const fallbackLat = v.lat || event.lat || 19.076;
                const fallbackLng = v.lng || event.lng || 72.8777;

                const marker = {
                  id: volId,
                  name: v.name,
                  status: v.assignmentStatus === 'accepted' ? 'active' : v.status, // Map status to what RealMap expects
                  lat: liveLoc ? liveLoc.lat : fallbackLat,
                  lng: liveLoc ? liveLoc.lng : fallbackLng
                };
                return marker;
              }).filter(v => {
                const isValid = v.lat && v.lng;
                if (!isValid) console.warn('[EventDetails] Filtered out invalid marker:', v);
                return isValid;
              })}
              showCurrentLocation={true}
              height="280px"
              zoom={14}
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <p>Radius: <span className="font-semibold text-gray-800">{event.radius}km</span></p>
            <p>Type: <span className="font-semibold text-gray-800">{typeInfo?.label || event.type}</span></p>
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
                      <span>{(vol.skills || []).join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={vol.rating} size="sm" readOnly onRate={(r) => rateVolunteer(vol.id, r)} />
                  {vol.assignmentStatus === 'pending' ? (
                    <span className="badge-orange">Requested</span>
                  ) : (
                    <span className="badge-green">Assigned</span>
                  )}
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
                      <p className="text-xs text-gray-500">{(vol.skills || []).join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={vol.rating} size="sm" readOnly />
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
                    <p className="text-xs text-gray-500">{(vol.skills || []).join(', ')}</p>
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
