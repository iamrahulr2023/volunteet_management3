export const SKILLS = [
  'First Aid', 'Crowd Management', 'Cooking', 'Driving', 'Medical',
  'Counseling', 'Teaching', 'Construction', 'IT Support', 'Photography',
  'Translation', 'Logistics', 'Security', 'Search & Rescue', 'Communications'
];

export const EVENT_TYPES = [
  { value: 'disaster', label: 'Disaster Relief', color: 'red' },
  { value: 'food', label: 'Food Distribution', color: 'orange' },
  { value: 'crowd', label: 'Crowd Management', color: 'blue' },
  { value: 'medical', label: 'Medical Camp', color: 'green' },
  { value: 'cleanup', label: 'Cleanup Drive', color: 'emerald' },
];

export const mockVolunteers = [
  { id: 1, name: 'Aarav Sharma', phone: '9876543210', skills: ['First Aid', 'Medical'], location: 'Mumbai', rating: 4.8, status: 'active', avatar: 'AS', totalHours: 120, availability: 'Weekends', workload: 'medium', lat: 19.076, lng: 72.8777 },
  { id: 2, name: 'Priya Patel', phone: '9876543211', skills: ['Cooking', 'Logistics'], location: 'Delhi', rating: 4.5, status: 'active', avatar: 'PP', totalHours: 95, availability: 'Weekdays', workload: 'low', lat: 28.7041, lng: 77.1025 },
  { id: 3, name: 'Rahul Verma', phone: '9876543212', skills: ['Crowd Management', 'Security'], location: 'Bangalore', rating: 4.2, status: 'out', avatar: 'RV', totalHours: 150, availability: 'Anytime', workload: 'high', lat: 12.9716, lng: 77.5946 },
  { id: 4, name: 'Sneha Reddy', phone: '9876543213', skills: ['Teaching', 'Counseling'], location: 'Hyderabad', rating: 4.9, status: 'active', avatar: 'SR', totalHours: 200, availability: 'Weekends', workload: 'medium', lat: 17.385, lng: 78.4867 },
  { id: 5, name: 'Vikram Singh', phone: '9876543214', skills: ['Driving', 'Logistics'], location: 'Jaipur', rating: 3.8, status: 'removed', avatar: 'VS', totalHours: 60, availability: 'Weekdays', workload: 'low', lat: 26.9124, lng: 75.7873 },
  { id: 6, name: 'Ananya Gupta', phone: '9876543215', skills: ['Photography', 'Communications'], location: 'Pune', rating: 4.6, status: 'active', avatar: 'AG', totalHours: 85, availability: 'Anytime', workload: 'medium', lat: 18.5204, lng: 73.8567 },
  { id: 7, name: 'Kiran Das', phone: '9876543216', skills: ['IT Support', 'Search & Rescue'], location: 'Kolkata', rating: 4.1, status: 'active', avatar: 'KD', totalHours: 110, availability: 'Weekends', workload: 'high', lat: 22.5726, lng: 88.3639 },
  { id: 8, name: 'Meera Nair', phone: '9876543217', skills: ['First Aid', 'Translation'], location: 'Chennai', rating: 4.7, status: 'active', avatar: 'MN', totalHours: 175, availability: 'Anytime', workload: 'low', lat: 13.0827, lng: 80.2707 },
];

export const mockEvents = [
  {
    id: 1, name: 'Flood Relief Camp', type: 'disaster', location: 'Mumbai Central',
    lat: 19.076, lng: 72.8777, radius: 300, date: '2026-03-20', time: '08:00',
    requiredVolunteers: 15, requiredSkills: ['First Aid', 'Medical', 'Logistics'],
    assignedVolunteers: [1, 4, 6, 7, 8], assignmentMode: 'auto', status: 'active',
  },
  {
    id: 2, name: 'Community Food Drive', type: 'food', location: 'Connaught Place, Delhi',
    lat: 28.6315, lng: 77.2167, radius: 200, date: '2026-03-22', time: '10:00',
    requiredVolunteers: 10, requiredSkills: ['Cooking', 'Logistics', 'Driving'],
    assignedVolunteers: [2, 5], assignmentMode: 'manual', status: 'upcoming',
  },
  {
    id: 3, name: 'Marathon Crowd Control', type: 'crowd', location: 'Cubbon Park, Bangalore',
    lat: 12.9763, lng: 77.5929, radius: 500, date: '2026-03-25', time: '06:00',
    requiredVolunteers: 20, requiredSkills: ['Crowd Management', 'Security', 'Communications'],
    assignedVolunteers: [3, 7], assignmentMode: 'auto', status: 'active',
  },
  {
    id: 4, name: 'Free Health Checkup', type: 'medical', location: 'Juhu Beach, Mumbai',
    lat: 19.0988, lng: 72.8267, radius: 150, date: '2026-03-28', time: '09:00',
    requiredVolunteers: 8, requiredSkills: ['Medical', 'First Aid', 'Counseling'],
    assignedVolunteers: [1, 8], assignmentMode: 'auto', status: 'upcoming',
  },
  {
    id: 5, name: 'Beach Cleanup Drive', type: 'cleanup', location: 'Marina Beach, Chennai',
    lat: 13.0500, lng: 80.2824, radius: 400, date: '2026-04-01', time: '07:00',
    requiredVolunteers: 25, requiredSkills: ['Logistics', 'Photography'],
    assignedVolunteers: [6, 8], assignmentMode: 'manual', status: 'completed',
  },
];

export const mockAlerts = [
  { id: 1, type: 'boundary', message: 'Rahul Verma left the event boundary', volunteer: 'Rahul Verma', time: '2 min ago', severity: 'warning' },
  { id: 2, type: 'auto_remove', message: 'Vikram Singh auto-removed after 30 min inactivity', volunteer: 'Vikram Singh', time: '15 min ago', severity: 'danger' },
  { id: 3, type: 'assignment', message: 'New volunteer auto-assigned to Flood Relief Camp', volunteer: 'Meera Nair', time: '30 min ago', severity: 'info' },
  { id: 4, type: 'emergency', message: 'Emergency mode activated for Mumbai region', time: '1 hour ago', severity: 'danger' },
];

export const mockMessages = [
  { id: 1, sender: 'Admin (NGO)', text: 'Welcome everyone to the Flood Relief Camp group!', time: '08:00 AM', isAdmin: true },
  { id: 2, sender: 'Aarav Sharma', text: 'Thanks! I\'m on my way to the location.', time: '08:05 AM', isAdmin: false },
  { id: 3, sender: 'Sneha Reddy', text: 'I have the first aid supplies ready.', time: '08:07 AM', isAdmin: false },
  { id: 4, sender: 'Admin (NGO)', text: 'Great! Please check in once you arrive at the location.', time: '08:10 AM', isAdmin: true },
  { id: 5, sender: 'Ananya Gupta', text: 'Just arrived. The setup area looks good.', time: '08:15 AM', isAdmin: false },
  { id: 6, sender: 'Kiran Das', text: 'I\'ll handle the tech equipment. Where should I set up?', time: '08:18 AM', isAdmin: false },
  { id: 7, sender: 'Admin (NGO)', text: 'Kiran, please set up near the main tent. Aarav, coordinate with Sneha for the medical station.', time: '08:20 AM', isAdmin: true },
  { id: 8, sender: 'Meera Nair', text: 'I can help with translations if needed. I speak Tamil and Hindi.', time: '08:25 AM', isAdmin: false },
];

export const mockDirectMessages = [
  { id: 1, sender: 'Admin', text: 'Hi Aarav, can you lead the medical team today?', time: '07:30 AM', isAdmin: true },
  { id: 2, sender: 'Aarav Sharma', text: 'Sure! I\'ll coordinate with the other medical volunteers.', time: '07:32 AM', isAdmin: false },
  { id: 3, sender: 'Admin', text: 'Perfect. Let me know if you need any additional supplies.', time: '07:35 AM', isAdmin: true },
];

export const mockVolunteerEvents = [
  { id: 1, name: 'Flood Relief Camp', type: 'disaster', location: 'Mumbai Central', date: '2026-03-20', time: '08:00', status: 'accepted', geoStatus: 'inside' },
  { id: 2, name: 'Free Health Checkup', type: 'medical', location: 'Juhu Beach', date: '2026-03-28', time: '09:00', status: 'pending', geoStatus: null },
  { id: 3, name: 'Community Food Drive', type: 'food', location: 'Connaught Place', date: '2026-03-22', time: '10:00', status: 'pending', geoStatus: null },
];

export const mockHoursData = [
  { date: 'Mar 10', hours: 6 },
  { date: 'Mar 11', hours: 8 },
  { date: 'Mar 12', hours: 4 },
  { date: 'Mar 13', hours: 7 },
  { date: 'Mar 14', hours: 5 },
  { date: 'Mar 15', hours: 9 },
  { date: 'Mar 16', hours: 6 },
];

export const mockParticipationData = [
  { name: 'Disaster', volunteers: 45, events: 8 },
  { name: 'Food', volunteers: 32, events: 12 },
  { name: 'Crowd', volunteers: 28, events: 6 },
  { name: 'Medical', volunteers: 38, events: 10 },
  { name: 'Cleanup', volunteers: 55, events: 15 },
];

export const mockWorkBalanceData = [
  { name: 'Aarav Sharma', hours: 120, level: 'medium' },
  { name: 'Priya Patel', hours: 95, level: 'low' },
  { name: 'Rahul Verma', hours: 150, level: 'high' },
  { name: 'Sneha Reddy', hours: 200, level: 'high' },
  { name: 'Vikram Singh', hours: 60, level: 'low' },
  { name: 'Ananya Gupta', hours: 85, level: 'medium' },
  { name: 'Kiran Das', hours: 110, level: 'medium' },
  { name: 'Meera Nair', hours: 175, level: 'high' },
];
