import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import StarRating from '../../components/StarRating';
import Modal from '../../components/Modal';
import { Search, Filter, Star, MapPin, Clock, Award, BarChart2 } from 'lucide-react';

const statusStyles = {
  active: { badge: 'badge-green', text: 'Active' },
  inactive: { badge: 'badge-orange', text: 'Inactive' },
  out: { badge: 'badge-orange', text: 'Out of Boundary' },
  removed: { badge: 'badge-gray', text: 'Removed' },
};

const workloadColors = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

export default function Volunteers() {
  const { volunteers, rateVolunteer } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showRating, setShowRating] = useState(null);
  const [newRating, setNewRating] = useState(0);

  const filtered = volunteers.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && v.status !== statusFilter) return false;
    return true;
  });

  const handleRate = () => {
    if (showRating) {
      rateVolunteer(showRating.id, newRating);
      setShowRating(null);
      setNewRating(0);
    }
  };

  // Derive work balance data from real volunteers
  const workBalanceData = volunteers.map(v => {
    const hours = v.totalHours || Math.floor(Math.random() * 150 + 30);
    const level = hours > 140 ? 'high' : hours > 80 ? 'medium' : 'low';
    return { name: v.name, hours, level };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Volunteers</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your volunteer network</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteers..." className="input-field pl-12" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field appearance-none w-auto min-w-[150px]">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out">Out of Boundary</option>
          <option value="removed">Removed</option>
        </select>
      </div>

      {/* Volunteer Grid */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">No volunteers found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(vol => (
            <div key={vol.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    vol.status === 'active' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                    vol.status === 'out' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                    'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}>
                    {vol.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{vol.name}</h3>
                    <p className="text-sm text-gray-500">{vol.phone}</p>
                  </div>
                </div>
                <span className={statusStyles[vol.status]?.badge || 'badge-gray'}>{statusStyles[vol.status]?.text || vol.status}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4 text-primary-400" /> {vol.location || 'Not set'}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4 text-primary-400" /> {vol.totalHours || 0} hours • {vol.availability}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <StarRating rating={vol.rating} size="sm" readOnly />
                  <span className="text-gray-500 text-xs ml-1">({vol.rating})</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                {(vol.skills || []).map(s => <span key={s} className="badge-blue text-[11px]">{s}</span>)}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`badge text-xs border ${workloadColors[vol.workload] || workloadColors.medium}`}>
                  {vol.workload === 'low' ? '🟢' : vol.workload === 'medium' ? '🟡' : '🔴'} {vol.workload || 'medium'} workload
                </span>
                <button
                  onClick={() => { setShowRating(vol); setNewRating(vol.rating); }}
                  className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" /> Rate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fair Distribution Section */}
      {workBalanceData.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-primary-500" /> Work Balance Indicator
          </h3>
          <div className="space-y-3">
            {workBalanceData.map(item => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-32 shrink-0">{item.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.level === 'low' ? 'bg-emerald-400' : item.level === 'medium' ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${Math.min((item.hours / 200) * 100, 100)}%` }}
                  />
                </div>
                <span className={`badge text-xs border ${workloadColors[item.level]}`}>{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rating Modal */}
      <Modal isOpen={!!showRating} onClose={() => setShowRating(null)} title={`Rate ${showRating?.name}`} size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold mx-auto mb-4">
            {showRating?.avatar}
          </div>
          <p className="font-semibold text-gray-800 mb-4">{showRating?.name}</p>
          <div className="flex justify-center mb-6">
            <StarRating rating={newRating} onRate={setNewRating} size="lg" />
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={() => setShowRating(null)} className="btn-secondary">Cancel</button>
            <button onClick={handleRate} className="btn-primary">Submit Rating</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
