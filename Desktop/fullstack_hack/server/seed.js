const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vol_management';

const seedUsers = [
  {
    name: 'Admin NGO',
    email: 'admin@ngo.org',
    password: 'admin123',
    role: 'admin',
    phone: '9000000001',
    skills: [],
    location: { lat: 19.076, lng: 72.8777 },
    availability: true
  },
  {
    name: 'Aarav Sharma',
    email: 'aarav@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543210',
    skills: ['First Aid', 'Medical'],
    location: { lat: 19.076, lng: 72.8777 },
    availability: true,
    rating: 4.8,
    ratingCount: 12,
    workCount: 8
  },
  {
    name: 'Priya Patel',
    email: 'priya@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543211',
    skills: ['Cooking', 'Logistics'],
    location: { lat: 28.7041, lng: 77.1025 },
    availability: true,
    rating: 4.5,
    ratingCount: 8,
    workCount: 6
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543212',
    skills: ['Crowd Management', 'Security'],
    location: { lat: 12.9716, lng: 77.5946 },
    availability: true,
    rating: 4.2,
    ratingCount: 10,
    workCount: 10
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543213',
    skills: ['Teaching', 'Counseling'],
    location: { lat: 17.385, lng: 78.4867 },
    availability: true,
    rating: 4.9,
    ratingCount: 15,
    workCount: 12
  },
  {
    name: 'Vikram Singh',
    email: 'vikram@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543214',
    skills: ['Driving', 'Logistics'],
    location: { lat: 26.9124, lng: 75.7873 },
    availability: false,
    rating: 3.8,
    ratingCount: 5,
    workCount: 4
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543215',
    skills: ['Photography', 'Communications'],
    location: { lat: 18.5204, lng: 73.8567 },
    availability: true,
    rating: 4.6,
    ratingCount: 7,
    workCount: 5
  },
  {
    name: 'Kiran Das',
    email: 'kiran@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543216',
    skills: ['IT Support', 'Search & Rescue'],
    location: { lat: 22.5726, lng: 88.3639 },
    availability: true,
    rating: 4.1,
    ratingCount: 9,
    workCount: 7
  },
  {
    name: 'Meera Nair',
    email: 'meera@volunteer.com',
    password: 'vol123',
    role: 'volunteer',
    phone: '9876543217',
    skills: ['First Aid', 'Translation'],
    location: { lat: 13.0827, lng: 80.2707 },
    availability: true,
    rating: 4.7,
    ratingCount: 11,
    workCount: 9
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing users and events');

    // Insert users (password will be hashed by the pre-save hook)
    const createdUsers = [];
    for (const u of seedUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
      console.log(`  ✓ Created ${user.role}: ${user.name} (${user.email})`);
    }

    const admin = createdUsers.find(u => u.role === 'admin');

    // Seed events
    const seedEvents = [
      {
        title: 'Flood Relief Camp',
        type: 'Disaster',
        location: { lat: 19.076, lng: 72.8777 },
        radius: 5,
        dateTime: new Date('2026-03-20T08:00:00'),
        requiredVolunteers: 15,
        requiredSkills: ['First Aid', 'Medical', 'Logistics'],
        assignmentMode: 'auto',
        createdBy: admin._id,
        status: 'active'
      },
      {
        title: 'Community Food Drive',
        type: 'Food',
        location: { lat: 28.6315, lng: 77.2167 },
        radius: 3,
        dateTime: new Date('2026-03-22T10:00:00'),
        requiredVolunteers: 10,
        requiredSkills: ['Cooking', 'Logistics', 'Driving'],
        assignmentMode: 'manual',
        createdBy: admin._id,
        status: 'active'
      },
      {
        title: 'Marathon Crowd Control',
        type: 'Crowd',
        location: { lat: 12.9763, lng: 77.5929 },
        radius: 8,
        dateTime: new Date('2026-03-25T06:00:00'),
        requiredVolunteers: 20,
        requiredSkills: ['Crowd Management', 'Security', 'Communications'],
        assignmentMode: 'auto',
        createdBy: admin._id,
        status: 'active'
      },
      {
        title: 'Free Health Checkup',
        type: 'Medical',
        location: { lat: 19.0988, lng: 72.8267 },
        radius: 2,
        dateTime: new Date('2026-03-28T09:00:00'),
        requiredVolunteers: 8,
        requiredSkills: ['Medical', 'First Aid', 'Counseling'],
        assignmentMode: 'auto',
        createdBy: admin._id,
        status: 'active'
      },
      {
        title: 'Beach Cleanup Drive',
        type: 'Cleanup',
        location: { lat: 13.05, lng: 80.2824 },
        radius: 6,
        dateTime: new Date('2026-04-01T07:00:00'),
        requiredVolunteers: 25,
        requiredSkills: ['Logistics', 'Photography'],
        assignmentMode: 'manual',
        createdBy: admin._id,
        status: 'active'
      }
    ];

    for (const ev of seedEvents) {
      const event = await Event.create(ev);
      console.log(`  ✓ Created event: ${event.title}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Login credentials:');
    console.log('   Admin  → admin@ngo.org / admin123');
    console.log('   Volunteer → aarav@volunteer.com / vol123');
    console.log('   (All volunteers share password: vol123)\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
