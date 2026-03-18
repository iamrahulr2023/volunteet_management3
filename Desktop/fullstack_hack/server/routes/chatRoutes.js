const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getChat, sendMessage, getMyChats, deleteChat } = require('../controllers/chatController');

router.get('/my-chats', auth, getMyChats);
router.get('/:eventId', auth, getChat);
router.post('/:eventId/message', auth, sendMessage);
router.delete('/:eventId', auth, deleteChat);

module.exports = router;
