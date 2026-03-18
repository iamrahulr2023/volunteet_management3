const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  triggerEmergency
} = require('../controllers/eventController');

router.post('/create', auth, adminOnly, createEvent);
router.get('/', auth, getEvents);
router.get('/:id', auth, getEventById);
router.put('/:id', auth, adminOnly, updateEvent);
router.delete('/:id', auth, adminOnly, deleteEvent);
router.post('/:id/emergency', auth, adminOnly, triggerEmergency);

module.exports = router;
