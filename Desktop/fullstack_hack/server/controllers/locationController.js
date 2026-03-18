const User = require('../models/User');
const Event = require('../models/Event');
const Alert = require('../models/Alert');
const Assignment = require('../models/Assignment');
const { calculateDistance, apiResponse } = require('../utils/helpers');
const { sendGeoFenceAlert } = require('../services/notificationService');
const { reassign } = require('../services/assignmentService');

// In-memory store for tracking out-of-bound timestamps
const outOfBoundTimers = {};

// POST /location/update
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const volunteerId = req.user._id;

    // Update user location
    await User.findByIdAndUpdate(volunteerId, {
      location: { lat, lng }
    });

    // Check geo-fence for all active assignments
    const activeAssignments = await Assignment.find({
      volunteerId,
      status: 'accepted'
    }).populate('eventId');

    const violations = [];

    for (const assignment of activeAssignments) {
      const event = assignment.eventId;
      if (!event || event.status !== 'active') continue;

      const distance = calculateDistance(lat, lng, event.location.lat, event.location.lng);

      if (distance > event.radius) {
        // CASE 1: Volunteer is out of bounds — send alert
        const alert = await Alert.create({
          eventId: event._id,
          volunteerId,
          type: 'geo-fence',
          message: `Volunteer ${req.user.name} is ${distance.toFixed(2)}km away from event "${event.title}" (radius: ${event.radius}km)`,
          status: 'active'
        });
        violations.push(alert);

        // Notify admin
        sendGeoFenceAlert(event.createdBy.toString(), {
          eventId: event._id,
          volunteerId,
          volunteerName: req.user.name,
          distance: distance.toFixed(2),
          eventTitle: event.title,
          message: alert.message
        });

        // CASE 2: Track out-of-bound time for 30-minute auto-removal
        const key = `${volunteerId}_${event._id}`;
        if (!outOfBoundTimers[key]) {
          outOfBoundTimers[key] = Date.now();
        } else {
          const elapsed = (Date.now() - outOfBoundTimers[key]) / 60000; // minutes
          if (elapsed >= 30) {
            // Auto-remove volunteer after 30 min out of bounds
            assignment.status = 'removed';
            await assignment.save();

            // Resolve old alerts
            await Alert.updateMany(
              { eventId: event._id, volunteerId, status: 'active', type: 'geo-fence' },
              { status: 'resolved' }
            );

            // Trigger reassignment
            const io = req.app.get('io');
            await reassign(event, [volunteerId], io);

            delete outOfBoundTimers[key];
          }
        }
      } else {
        // Volunteer is within bounds — clear timer
        const key = `${volunteerId}_${event._id}`;
        if (outOfBoundTimers[key]) {
          delete outOfBoundTimers[key];

          // Resolve active geo-fence alerts
          await Alert.updateMany(
            { eventId: event._id, volunteerId, status: 'active', type: 'geo-fence' },
            { status: 'resolved' }
          );
        }
      }
    }

    return apiResponse(res, 200, true, 'Location updated', {
      location: { lat, lng },
      violations: violations.length > 0 ? violations : undefined
    });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
