const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const { rateVolunteer, getVolunteers, getVolunteerById, updateAvailability } = require('../controllers/volunteerController');

router.post('/rate', auth, adminOnly, rateVolunteer);
router.get('/', auth, getVolunteers);
router.get('/:id', auth, getVolunteerById);
router.put('/availability', auth, updateAvailability);

module.exports = router;
