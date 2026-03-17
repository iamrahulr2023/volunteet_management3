import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, MessageCircle, BarChart3, LogOut, Shield, Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import ToastContainer from '../components/ToastContainer';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/events', icon: CalendarDays, label: 'Events' },
  { to: '/admin/volunteers', icon: Users, label: 'Volunteers' },
  { to: '/admin/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, emergencyMode, activateEmergency, deactivateEmergency } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToastContainer />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 shadow-sidebar flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-tight">VolunteerAI</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Emergency Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={emergencyMode ? deactivateEmergency : activateEmergency}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              emergencyMode
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse-soft'
                : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            {emergencyMode ? 'Deactivate Emergency' : 'Activate Emergency'}
          </button>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="sidebar-link w-full text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-gray-500">Welcome back,</h2>
            <p className="text-sm font-semibold text-gray-800">Admin</p>
          </div>
          <div className="flex items-center gap-3">
            {emergencyMode && (
              <span className="badge-red animate-pulse-soft flex items-center gap-1">
                <Zap className="w-3 h-3" /> EMERGENCY
              </span>
            )}
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
