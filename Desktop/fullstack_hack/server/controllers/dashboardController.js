const Event = require('../models/Event');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Alert = require('../models/Alert');
const HoursLogged = require('../models/HoursLogged');
const { apiResponse } = require('../utils/helpers');

// GET /dashboard/admin
exports.getAdminDashboard = async (req, res) => {
  try {
    const [
      totalEvents,
      activeEvents,
      completedEvents,
      totalVolunteers,
      activeVolunteers,
      alerts,
      hoursLogs,
      assignments
    ] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ status: 'active' }),
      Event.countDocuments({ status: 'completed' }),
      User.countDocuments({ role: 'volunteer' }),
      User.countDocuments({ role: 'volunteer', availability: true }),
      Alert.find({ status: 'active' }).populate('volunteerId', 'name email').populate('eventId', 'title'),
      HoursLogged.find().populate('volunteerId', 'name').populate('eventId', 'title'),
      Assignment.find({ status: 'accepted' }).populate('volunteerId', 'name location skills rating')
    ]);

    // Calculate total hours
    const totalHours = hoursLogs.reduce((sum, log) => sum + (log.totalHours || 0), 0);

    // Get volunteer locations from accepted assignments
    const volunteerLocations = assignments
      .filter(a => a.volunteerId && a.volunteerId.location)
      .map(a => ({
        _id: a.volunteerId._id,
        name: a.volunteerId.name,
        location: a.volunteerId.location,
        eventId: a.eventId
      }));

    return apiResponse(res, 200, true, 'Dashboard data fetched', {
      totalEvents,
      activeEvents,
      completedEvents,
      totalVolunteers,
      activeVolunteers,
      activeAlerts: alerts,
      totalHours: totalHours.toFixed(2),
      volunteerLocations,
      recentHours: hoursLogs.slice(-10)
    });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /dashboard/volunteer
exports.getVolunteerDashboard = async (req, res) => {
  try {
    const volunteerId = req.user._id;

    const [myAssignments, myHours, myAlerts] = await Promise.all([
      Assignment.find({ volunteerId }).populate('eventId'),
      HoursLogged.find({ volunteerId }).populate('eventId', 'title type'),
      Alert.find({ volunteerId, status: 'active' })
    ]);

    const totalHours = myHours.reduce((sum, log) => sum + (log.totalHours || 0), 0);

    return apiResponse(res, 200, true, 'Volunteer dashboard data', {
      totalAssignments: myAssignments.length,
      activeAssignments: myAssignments.filter(a => a.status === 'accepted').length,
      pendingAssignments: myAssignments.filter(a => a.status === 'pending').length,
      totalHours: totalHours.toFixed(2),
      recentAssignments: myAssignments.slice(-5),
      recentHours: myHours.slice(-5),
      activeAlerts: myAlerts
    });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
