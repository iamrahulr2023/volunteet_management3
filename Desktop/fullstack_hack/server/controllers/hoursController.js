const HoursLogged = require('../models/HoursLogged');
const Assignment = require('../models/Assignment');
const { apiResponse } = require('../utils/helpers');

// POST /hours/start
exports.startHours = async (req, res) => {
  try {
    const { eventId } = req.body;
    const volunteerId = req.user._id;

    // Verify volunteer is accepted for this event
    const assignment = await Assignment.findOne({
      eventId,
      volunteerId,
      status: 'accepted'
    });

    if (!assignment) {
      return apiResponse(res, 400, false, 'You must be an accepted volunteer for this event');
    }

    // Check for already running session
    const running = await HoursLogged.findOne({
      eventId,
      volunteerId,
      endTime: null
    });

    if (running) {
      return apiResponse(res, 400, false, 'You already have an active session for this event');
    }

    const log = await HoursLogged.create({
      eventId,
      volunteerId,
      startTime: new Date()
    });

    return apiResponse(res, 201, true, 'Hours tracking started', log);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /hours/stop
exports.stopHours = async (req, res) => {
  try {
    const { eventId } = req.body;
    const volunteerId = req.user._id;

    const log = await HoursLogged.findOne({
      eventId,
      volunteerId,
      endTime: null
    });

    if (!log) {
      return apiResponse(res, 400, false, 'No active session found');
    }

    log.endTime = new Date();
    log.totalHours = (log.endTime - log.startTime) / 3600000; // ms to hours
    await log.save();

    return apiResponse(res, 200, true, 'Hours tracking stopped', log);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /hours/event/:eventId
exports.getEventHours = async (req, res) => {
  try {
    const hours = await HoursLogged.find({ eventId: req.params.eventId })
      .populate('volunteerId', 'name email');

    return apiResponse(res, 200, true, 'Hours fetched', hours);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /hours/my
exports.getMyHours = async (req, res) => {
  try {
    const hours = await HoursLogged.find({ volunteerId: req.user._id })
      .populate('eventId', 'title type');

    return apiResponse(res, 200, true, 'Your hours fetched', hours);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
