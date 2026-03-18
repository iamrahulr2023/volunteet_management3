const express = require('express');
const router = express.Router();
const { auth, volunteerOnly } = require('../middleware/auth');
const { startHours, stopHours, getEventHours, getMyHours } = require('../controllers/hoursController');

router.post('/start', auth, volunteerOnly, startHours);
router.post('/stop', auth, volunteerOnly, stopHours);
router.get('/event/:eventId', auth, getEventHours);
router.get('/my', auth, volunteerOnly, getMyHours);

module.exports = router;
