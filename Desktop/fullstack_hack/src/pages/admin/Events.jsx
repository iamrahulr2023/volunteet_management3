import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { EVENT_TYPES, SKILLS } from '../../data/mockData';
import Modal from '../../components/Modal';
import MultiSelect from '../../components/MultiSelect';
import RealMap from '../../components/RealMap';
import { Plus, Calendar, MapPin, Users, Search, Filter, Eye, Crosshair, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  active: 'badge-green',
  upcoming: 'badge-blue',
  completed: 'badge-gray',
};

export default function Events() {
  const { events, addEvent, addToast } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', type: 'disaster', location: '', radius: 200, date: '', time: '',
    requiredVolunteers: 10, requiredSkills: [], assignmentMode: 'auto',
    lat: null, lng: null,
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handlePinPlace = ([lat, lng]) => {
    setForm(p => ({ ...p, lat, lng }));
  };

  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm(p => ({ ...p, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        },
        () => alert('Could not get your location. Please allow location access.'),
        { enableHighAccuracy: true }
      );
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await addEvent({
        ...form,
        lat: form.lat || 19.076,
        lng: form.lng || 72.877,
      });
      setShowCreate(false);
      setForm({ name: '', type: 'disaster', location: '', radius: 200, date: '', time: '', requiredVolunteers: 10, requiredSkills: [], assignmentMode: 'auto', lat: null, lng: null });
    } catch (err) {
      // Error toast is already shown by addEvent in context
    } finally {
      setCreating(false);
    }
  };

  const filtered = events.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && e.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and create volunteer events</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="input-field pl-12" />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="input-field pl-11 pr-8 appearance-none min-w-[180px]">
            <option value="">All Types</option>
            {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(event => {
          const typeInfo = EVENT_TYPES.find(t => t.value === event.type);
          return (
            <div key={event.id} className="card group cursor-pointer" onClick={() => navigate(`/admin/events/${event.id}`)}>
              <div className="flex items-start justify-between mb-3">
                <span className={statusColors[event.status] || 'badge-gray'}>{event.status}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-400" /> {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-400" /> {event.date} at {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary-400" />
                  {(event.assignedVolunteers || []).length}/{event.requiredVolunteers} volunteers
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                {event.requiredSkills.slice(0, 3).map(s => (
                  <span key={s} className="badge-blue text-[11px]">{s}</span>
                ))}
                {event.requiredSkills.length > 3 && <span className="badge-gray text-[11px]">+{event.requiredSkills.length - 3}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Event Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Event" size="xl">
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} className="input-field" placeholder="e.g., Flood Relief Camp" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} className="input-field appearance-none">
                {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
              <input value={form.location} onChange={e => update('location', e.target.value)} className="input-field" placeholder="Event location name" required />
            </div>

            {/* MAP PICKER */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  📍 Pin Event Location on Map
                </label>
                <button type="button" onClick={useMyLocation} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5" /> Use My Location
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-2">Click on the map to set the event location, or use "Use My Location" button</p>
              <RealMap
                center={form.lat && form.lng ? [form.lat, form.lng] : [20.5937, 78.9629]}
                zoom={form.lat ? 15 : 5}
                clickable={true}
                onPinPlace={handlePinPlace}
                pinPosition={form.lat && form.lng ? [form.lat, form.lng] : null}
                radius={form.radius}
                showCurrentLocation={true}
                height="280px"
              />
              {form.lat && form.lng && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-primary-500" />
                  <span>Lat: <strong>{form.lat.toFixed(5)}</strong>, Lng: <strong>{form.lng.toFixed(5)}</strong></span>
                  <button type="button" onClick={() => setForm(p => ({ ...p, lat: null, lng: null }))} className="text-red-500 hover:text-red-600 ml-2 underline">Clear</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" value={form.date} onChange={e => update('date', e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input type="time" value={form.time} onChange={e => update('time', e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius: {form.radius}m</label>
              <input
                type="range" min="50" max="500" step="10"
                value={form.radius} onChange={e => update('radius', parseInt(e.target.value))}
                className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50m</span><span>500m</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Volunteers</label>
              <input type="number" value={form.requiredVolunteers} onChange={e => update('requiredVolunteers', parseInt(e.target.value))} className="input-field" min="1" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <MultiSelect selected={form.requiredSkills} onChange={v => update('requiredSkills', v)} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Mode</label>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button type="button" onClick={() => update('assignmentMode', 'auto')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${form.assignmentMode === 'auto' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
                  🤖 Auto Assign
                </button>
                <button type="button" onClick={() => update('assignmentMode', 'manual')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${form.assignmentMode === 'manual' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'}`}>
                  ✋ Manual Assign
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary" disabled={creating}>Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={creating}>
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              {creating ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
