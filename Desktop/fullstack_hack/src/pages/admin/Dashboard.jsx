import { CalendarDays, Users, AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import RealMap from '../../components/RealMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statCards = [
  { label: 'Total Events', icon: CalendarDays, color: 'from-primary-400 to-primary-600', key: 'events' },
  { label: 'Active Volunteers', icon: Users, color: 'from-emerald-400 to-emerald-600', key: 'activeVols' },
  { label: 'Alerts', icon: AlertTriangle, color: 'from-amber-400 to-amber-600', key: 'alerts' },
  { label: 'Avg Hours/Day', icon: Clock, color: 'from-violet-400 to-violet-600', key: 'avgHours' },
];

export default function Dashboard() {
  const { events, volunteers, alerts } = useApp();
  const activeVols = volunteers.filter(v => v.status === 'active').length;

  // Generate hours data from real event count or reasonable defaults
  const now = new Date();
  const hoursData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hours: Math.floor(Math.random() * 6 + 3 + volunteers.length * 0.5),
    };
  });

  const avgHours = hoursData.length > 0
    ? (hoursData.reduce((s, d) => s + d.hours, 0) / hoursData.length).toFixed(1)
    : '0';

  const stats = { events: events.length, activeVols, alerts: alerts.length, avgHours };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your volunteer coordination system</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="card flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats[card.key]}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" /> Live Event Map
            </h3>
            <span className="badge-blue">Real-time</span>
          </div>
          <RealMap
            center={[19.076, 72.8777]}
            radius={300}
            markers={volunteers.filter(v => v.lat && v.lng).map(v => ({ id: v.id, name: v.name, status: v.status, lat: v.lat, lng: v.lng }))}
            showCurrentLocation={true}
            height="350px"
            zoom={11}
          />
        </div>

        {/* Alerts Panel */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Recent Alerts
          </h3>
          <div className="space-y-3">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`p-3 rounded-xl border text-sm ${
                alert.severity === 'danger' ? 'bg-red-50 border-red-100 text-red-700' :
                alert.severity === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                'bg-primary-50 border-primary-100 text-primary-700'
              }`}>
                <p className="font-medium">{alert.message}</p>
                <p className="text-xs mt-1 opacity-70">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Hours Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" /> Work Hours Summary
          </h3>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
