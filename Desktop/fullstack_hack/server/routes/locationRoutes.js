const express = require('express');
const router = express.Router();
const { auth, volunteerOnly } = require('../middleware/auth');
const { updateLocation } = require('../controllers/locationController');

router.post('/update', auth, volunteerOnly, updateLocation);

module.exports = router;
