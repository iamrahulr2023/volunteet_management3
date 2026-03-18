const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['geo-fence', 'emergency'],
    required: true
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
