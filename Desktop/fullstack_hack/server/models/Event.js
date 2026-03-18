const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['Disaster', 'Food', 'Crowd', 'Medical', 'Cleanup'],
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  radius: { type: Number, required: true, default: 5 }, // in km
  dateTime: { type: Date, required: true },
  requiredVolunteers: { type: Number, required: true, default: 1 },
  requiredSkills: [{ type: String }],
  assignmentMode: {
    type: String,
    enum: ['auto', 'manual'],
    default: 'auto'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
