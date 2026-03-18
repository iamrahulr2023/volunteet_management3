const Assignment = require('../models/Assignment');
const Event = require('../models/Event');
const User = require('../models/User');
const { autoAssign, reassign, addToChatOnAccept, ensureChatCreated } = require('../services/assignmentService');
const { notifyUser } = require('../services/notificationService');
const { apiResponse } = require('../utils/helpers');

// POST /assignments/auto-assign
exports.autoAssignVolunteers = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    const io = req.app.get('io');
    const assignments = await autoAssign(event, io);
    
    // Check if event is now fully assigned to create group chat
    await ensureChatCreated(eventId);

    return apiResponse(res, 200, true, `${assignments.length} volunteers assigned`, assignments);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /assignments/manual-assign
exports.manualAssign = async (req, res) => {
  try {
    const { eventId, volunteerIds } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return apiResponse(res, 404, false, 'Event not found');
    }

    const assignments = [];
    const io = req.app.get('io');

    for (const volunteerId of volunteerIds) {
      const existing = await Assignment.findOne({ eventId, volunteerId, status: { $in: ['pending', 'accepted'] } });
      if (existing) continue;

      const assignment = await Assignment.create({
        eventId,
        volunteerId,
        status: 'pending',
        assignedAt: new Date()
      });
      assignments.push(assignment);

      // Notify volunteer
      notifyUser(volunteerId, 'assignment', {
        message: `You have been manually assigned to event: ${event.title}`,
        eventId,
        assignmentId: assignment._id
      });
    }
    
    // Check if event is now fully assigned to create group chat
    await ensureChatCreated(eventId);

    return apiResponse(res, 200, true, `${assignments.length} volunteers manually assigned`, assignments);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /assignments/respond
exports.respondToAssignment = async (req, res) => {
  try {
    const { assignmentId, response } = req.body; // response: 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(response)) {
      return apiResponse(res, 400, false, 'Response must be accepted or rejected');
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return apiResponse(res, 404, false, 'Assignment not found');
    }

    if (assignment.volunteerId.toString() !== req.user._id.toString()) {
      return apiResponse(res, 403, false, 'Not your assignment');
    }

    assignment.status = response;
    assignment.responseTime = new Date();
    await assignment.save();

    const event = await Event.findById(assignment.eventId);

    if (response === 'accepted') {
      // Increment workCount
      await User.findByIdAndUpdate(req.user._id, { $inc: { workCount: 1 } });

      // Add volunteer to event chat
      await addToChatOnAccept(assignment.eventId, req.user._id);

      // Notify admin
      notifyUser(event.createdBy, 'assignment_accepted', {
        message: `${req.user.name} accepted assignment for ${event.title}`,
        eventId: event._id,
        volunteerId: req.user._id
      });

      // Check if event is now full
      const acceptedCount = await Assignment.countDocuments({ 
        eventId: event._id, 
        status: 'accepted' 
      });

      if (acceptedCount >= event.requiredVolunteers) {
        // Cancel all remaining pending requests for this event
        await Assignment.updateMany(
          { eventId: event._id, status: 'pending' },
          { status: 'removed' }
        );
      }
    } else if (response === 'rejected') {
      // Trigger auto-reassignment
      const io = req.app.get('io');
      await reassign(event, [req.user._id], io);

      // Notify admin
      notifyUser(event.createdBy, 'assignment_rejected', {
        message: `${req.user.name} rejected assignment for ${event.title}. Auto-reassignment triggered.`,
        eventId: event._id
      });
    }

    return apiResponse(res, 200, true, `Assignment ${response}`, assignment);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /assignments/remove
exports.removeVolunteer = async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return apiResponse(res, 404, false, 'Assignment not found');
    }

    assignment.status = 'removed';
    await assignment.save();

    const event = await Event.findById(assignment.eventId);

    // Notify the removed volunteer
    notifyUser(assignment.volunteerId, 'removed', {
      message: `You have been removed from event: ${event.title}`,
      eventId: event._id
    });

    // Trigger reassignment
    const io = req.app.get('io');
    await reassign(event, [assignment.volunteerId], io);

    return apiResponse(res, 200, true, 'Volunteer removed and reassignment triggered', assignment);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /assignments/event/:eventId
exports.getEventAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ eventId: req.params.eventId })
      .populate('volunteerId', 'name email phone skills rating workCount location');

    return apiResponse(res, 200, true, 'Assignments fetched', assignments);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /assignments/my
exports.getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ volunteerId: req.user._id })
      .populate('eventId');

    return apiResponse(res, 200, true, 'Your assignments fetched', assignments);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
