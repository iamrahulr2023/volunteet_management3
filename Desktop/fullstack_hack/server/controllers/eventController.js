const Event = require('../models/Event');
const User = require('../models/User');
const Alert = require('../models/Alert');
const { autoAssign } = require('../services/assignmentService');
const { sendEmergencyAlert } = require('../services/notificationService');
const { apiResponse } = require('../utils/helpers');

// POST /events/create
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id
    });

    // If auto assignment mode, trigger auto-assign
    if (event.assignmentMode === 'auto') {
      const io = req.app.get('io');
      await autoAssign(event, io);
    }

    return apiResponse(res, 201, true, 'Event created successfully', event);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /events
exports.getEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;

    // Admin should only see their own created events
    if (req.user.role === 'admin') {
      filter.createdBy = req.user._id;
      console.log(`[EventFilter] Admin ${req.user.name} (${req.user._id}) fetching events. Filter applied.`);
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return apiResponse(res, 200, true, 'Events fetched', events);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    return apiResponse(res, 200, true, 'Event fetched', event);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// PUT /events/:id
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    return apiResponse(res, 200, true, 'Event updated', event);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// DELETE /events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    return apiResponse(res, 200, true, 'Event deleted');
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /events/:id/emergency
exports.triggerEmergency = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    // Find nearby available volunteers
    const User = require('../models/User');
    const { calculateDistance } = require('../utils/helpers');

    const volunteers = await User.find({ role: 'volunteer', availability: true });
    const nearby = volunteers.filter(v => {
      const dist = calculateDistance(
        v.location.lat, v.location.lng,
        event.location.lat, event.location.lng
      );
      return dist <= event.radius * 2; // Double radius for emergency
    });

    // Create emergency alerts
    const alerts = [];
    for (const v of nearby) {
      const alert = await Alert.create({
        eventId: event._id,
        volunteerId: v._id,
        type: 'emergency',
        message: `EMERGENCY: ${event.title} needs immediate assistance!`,
        status: 'active'
      });
      alerts.push(alert);
    }

    // Send socket notifications
    const nearbyIds = nearby.map(v => v._id.toString());
    sendEmergencyAlert(nearbyIds, {
      eventId: event._id,
      title: event.title,
      message: `EMERGENCY at ${event.title}! Immediate volunteers needed.`,
      location: event.location
    });

    return apiResponse(res, 200, true, `Emergency triggered. ${nearby.length} volunteers notified.`, {
      notifiedCount: nearby.length,
      alerts
    });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
