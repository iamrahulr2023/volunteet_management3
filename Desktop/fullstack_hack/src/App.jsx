import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

import Login from './pages/Login';
import Signup from './pages/Signup';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Events from './pages/admin/Events';
import EventDetails from './pages/admin/EventDetails';
import Volunteers from './pages/admin/Volunteers';
import Reports from './pages/admin/Reports';

import VolunteerLayout from './layouts/VolunteerLayout';
import VolunteerDashboard from './pages/volunteer/Dashboard';
import ActiveEvent from './pages/volunteer/ActiveEvent';

import Chat from './pages/shared/Chat';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="chat" element={<Chat />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Volunteer */}
          <Route path="/volunteer" element={<VolunteerLayout />}>
            <Route index element={<VolunteerDashboard />} />
            <Route path="active-event" element={<ActiveEvent />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
