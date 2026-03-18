const HoursLogged = require('../models/HoursLogged');
const Assignment = require('../models/Assignment');
const Event = require('../models/Event');
const User = require('../models/User');
const { apiResponse } = require('../utils/helpers');

// GET /reports/export
exports.exportReport = async (req, res) => {
  try {
    const { type } = req.query; // 'hours' or 'attendance'

    if (type === 'hours') {
      const hours = await HoursLogged.find()
        .populate('volunteerId', 'name email')
        .populate('eventId', 'title type');

      const csvHeader = 'Volunteer Name,Email,Event Title,Event Type,Start Time,End Time,Total Hours\n';
      const csvRows = hours.map(h =>
        `"${h.volunteerId?.name || 'N/A'}","${h.volunteerId?.email || 'N/A'}","${h.eventId?.title || 'N/A'}","${h.eventId?.type || 'N/A'}","${h.startTime?.toISOString() || ''}","${h.endTime?.toISOString() || ''}","${h.totalHours?.toFixed(2) || '0'}"`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=hours_report.csv');
      return res.send(csvHeader + csvRows);
    }

    if (type === 'attendance') {
      const assignments = await Assignment.find({ status: 'accepted' })
        .populate('volunteerId', 'name email phone skills')
        .populate('eventId', 'title type dateTime');

      const csvHeader = 'Volunteer Name,Email,Phone,Event Title,Event Type,Event Date,Assigned At,Status\n';
      const csvRows = assignments.map(a =>
        `"${a.volunteerId?.name || 'N/A'}","${a.volunteerId?.email || 'N/A'}","${a.volunteerId?.phone || ''}","${a.eventId?.title || 'N/A'}","${a.eventId?.type || 'N/A'}","${a.eventId?.dateTime?.toISOString() || ''}","${a.assignedAt?.toISOString() || ''}","${a.status}"`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.csv');
      return res.send(csvHeader + csvRows);
    }

    return apiResponse(res, 400, false, 'Invalid report type. Use ?type=hours or ?type=attendance');
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
