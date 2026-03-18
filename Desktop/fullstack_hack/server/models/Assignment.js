const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'removed'],
    default: 'pending'
  },
  assignedAt: { type: Date, default: Date.now },
  responseTime: { type: Date }
}, { timestamps: true });

// Compound index: one assignment per volunteer per event
assignmentSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
