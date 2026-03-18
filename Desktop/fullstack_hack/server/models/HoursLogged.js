const mongoose = require('mongoose');

const hoursLoggedSchema = new mongoose.Schema({
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
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  totalHours: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('HoursLogged', hoursLoggedSchema);
