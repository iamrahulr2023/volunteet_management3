import { mockHoursData, mockParticipationData } from '../../data/mockData';
import { useApp } from '../../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { Download, TrendingUp, Users, CalendarDays, Clock } from 'lucide-react';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const { volunteers, events } = useApp();

  const totalHours = volunteers.reduce((s, v) => s + v.totalHours, 0);
  const pieData = mockParticipationData.map(d => ({ name: d.name, value: d.volunteers }));

  const exportCSV = () => {
    const header = 'Volunteer,Hours,Rating,Status,Workload\n';
    const rows = volunteers.map(v =>
      `${v.name},${v.totalHours},${v.rating},${v.status},${v.workload}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'volunteer_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Insights into volunteer participation and event performance</p>
        </div>
        <button onClick={exportCSV} className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalHours}</p>
            <p className="text-sm text-gray-500">Total Hours</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{volunteers.length}</p>
            <p className="text-sm text-gray-500">Total Volunteers</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{events.length}</p>
            <p className="text-sm text-gray-500">Total Events</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Hours Chart */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-500" /> Daily Work Hours
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participation Pie */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary-500" /> Volunteer Participation by Type
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Participation Bar */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-primary-500" /> Events & Volunteers by Category
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockParticipationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend />
              <Bar dataKey="volunteers" fill="#3b82f6" name="Volunteers" radius={[6, 6, 0, 0]} />
              <Bar dataKey="events" fill="#22c55e" name="Events" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
