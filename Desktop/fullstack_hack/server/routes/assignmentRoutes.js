const express = require('express');
const router = express.Router();
const { auth, adminOnly, volunteerOnly } = require('../middleware/auth');
const {
  autoAssignVolunteers,
  manualAssign,
  respondToAssignment,
  removeVolunteer,
  getEventAssignments,
  getMyAssignments
} = require('../controllers/assignmentController');

router.post('/auto-assign', auth, adminOnly, autoAssignVolunteers);
router.post('/manual-assign', auth, adminOnly, manualAssign);
router.post('/respond', auth, volunteerOnly, respondToAssignment);
router.post('/remove', auth, adminOnly, removeVolunteer);
router.get('/event/:eventId', auth, getEventAssignments);
router.get('/my', auth, volunteerOnly, getMyAssignments);

module.exports = router;
