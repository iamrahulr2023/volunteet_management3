const express = require('express');
const router = express.Router();
const { auth, adminOnly, volunteerOnly } = require('../middleware/auth');
const { getAdminDashboard, getVolunteerDashboard } = require('../controllers/dashboardController');

router.get('/admin', auth, adminOnly, getAdminDashboard);
router.get('/volunteer', auth, volunteerOnly, getVolunteerDashboard);

module.exports = router;
