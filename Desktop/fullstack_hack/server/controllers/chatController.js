const Chat = require('../models/Chat');
const { apiResponse } = require('../utils/helpers');

// GET /chat/:eventId
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ eventId: req.params.eventId })
      .populate('members', 'name email role')
      .populate('messages.senderId', 'name email role');

    if (!chat) {
      return apiResponse(res, 404, false, 'No chat found for this event');
    }

    return apiResponse(res, 200, true, 'Chat fetched', chat);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /chat/:eventId/message  (REST fallback)
exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const chat = await Chat.findOne({ eventId: req.params.eventId });

    if (!chat) {
      return apiResponse(res, 404, false, 'No chat found for this event');
    }

    if (!chat.members.includes(req.user._id)) {
      return apiResponse(res, 403, false, 'You are not a member of this chat');
    }

    chat.messages.push({
      senderId: req.user._id,
      text,
      timestamp: new Date()
    });
    await chat.save();

    // Also emit via socket
    const io = req.app.get('io');
    if (io) {
      io.to(`event_${req.params.eventId}`).emit('receive_message', {
        eventId: req.params.eventId,
        senderId: req.user._id,
        senderName: req.user.name,
        text,
        timestamp: new Date()
      });
    }

    return apiResponse(res, 200, true, 'Message sent', chat.messages[chat.messages.length - 1]);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /chat/my-chats
exports.getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user._id })
      .populate('eventId', 'title type status')
      .populate('members', 'name email role')
      .select('-messages');

    return apiResponse(res, 200, true, 'Chats fetched', chats);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// DELETE /chat/:eventId
exports.deleteChat = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return apiResponse(res, 403, false, 'Only admins can delete chats');
    }

    const chat = await Chat.findOneAndDelete({ eventId: req.params.eventId });
    if (!chat) {
      return apiResponse(res, 404, false, 'Chat not found');
    }

    const io = req.app.get('io');
    if (io) {
      io.to(`event_${req.params.eventId}`).emit('chat_deleted', {
        eventId: req.params.eventId,
        message: 'This group chat has been deleted by an admin.'
      });
    }

    return apiResponse(res, 200, true, 'Chat deleted successfully');
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
