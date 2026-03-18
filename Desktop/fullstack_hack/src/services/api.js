import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor — attach JWT token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor — handle 401 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login/signup page
      if (!window.location.pathname.match(/^\/(signup)?$/)) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ───────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  signup: (userData) => API.post('/auth/signup', userData),
};

// ─── Events API ─────────────────────────────────────────────
export const eventsAPI = {
  getAll: (params) => API.get('/events', { params }),
  getById: (id) => API.get(`/events/${id}`),
  create: (eventData) => API.post('/events/create', eventData),
  update: (id, eventData) => API.put(`/events/${id}`, eventData),
  delete: (id) => API.delete(`/events/${id}`),
  triggerEmergency: (id) => API.post(`/events/${id}/emergency`),
};

// ─── Volunteers API ─────────────────────────────────────────
export const volunteersAPI = {
  getAll: () => API.get('/volunteers'),
  getById: (id) => API.get(`/volunteers/${id}`),
};

// ─── Assignments API ──────────────────────────────────────
export const assignmentsAPI = {
  autoAssign: (eventId) => API.post('/assignments/auto-assign', { eventId }),
  manualAssign: (eventId, volunteerIds) => API.post('/assignments/manual-assign', { eventId, volunteerIds }),
  respond: (assignmentId, response) => API.post('/assignments/respond', { assignmentId, response }),
  remove: (assignmentId) => API.post('/assignments/remove', { assignmentId }),
  getEventAssignments: (eventId) => API.get(`/assignments/event/${eventId}`),
  getMyAssignments: () => API.get('/assignments/my'),
};

// ─── Chat API ───────────────────────────────────────────────
export const chatAPI = {
  getChat: (eventId) => API.get(`/chat/${eventId}`),
  sendMessage: (eventId, text) => API.post(`/chat/${eventId}/message`, { text }),
  getMyChats: () => API.get('/chat/my-chats'),
  deleteChat: (eventId) => API.delete(`/chat/${eventId}`),
};

// ─── Dashboard API ──────────────────────────────────────────
export const dashboardAPI = {
  getStats: () => API.get('/dashboard/stats'),
};

export default API;
