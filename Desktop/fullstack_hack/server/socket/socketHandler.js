const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const User = require('../models/User');

const setupSocket = (io) => {
  // Socket.io authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.user._id})`);

    // Join personal room for notifications
    socket.join(`user_${socket.user._id}`);

    // JOIN ROOM — join event chat room
    socket.on('join_room', async (eventId) => {
      try {
        socket.join(`event_${eventId}`);
        console.log(`${socket.user.name} joined room: event_${eventId}`);

        // Broadcast to room
        socket.to(`event_${eventId}`).emit('user_joined', {
          userId: socket.user._id,
          name: socket.user.name,
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // LEAVE ROOM
    socket.on('leave_room', (eventId) => {
      socket.leave(`event_${eventId}`);
      socket.to(`event_${eventId}`).emit('user_left', {
        userId: socket.user._id,
        name: socket.user.name,
        timestamp: new Date()
      });
    });

    // SEND MESSAGE — save to DB and broadcast
    socket.on('send_message', async ({ eventId, text }) => {
      try {
        let chat = await Chat.findOne({ eventId });
        if (!chat) {
          chat = await Chat.create({
            eventId,
            members: [socket.user._id],
            messages: []
          });
        }

        const message = {
          senderId: socket.user._id,
          text,
          timestamp: new Date()
        };

        chat.messages.push(message);
        await chat.save();

        const savedMessage = chat.messages[chat.messages.length - 1];

        // Broadcast to all in the room (including sender)
        io.to(`event_${eventId}`).emit('receive_message', {
          _id: savedMessage._id,
          eventId,
          senderId: socket.user._id,
          senderName: socket.user.name,
          senderRole: socket.user.role,
          text,
          timestamp: savedMessage.timestamp
        });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // TYPING indicator
    socket.on('typing', ({ eventId }) => {
      socket.to(`event_${eventId}`).emit('user_typing', {
        userId: socket.user._id,
        name: socket.user.name
      });
    });

    socket.on('stop_typing', ({ eventId }) => {
      socket.to(`event_${eventId}`).emit('user_stop_typing', {
        userId: socket.user._id,
        name: socket.user.name
      });
    });

    // LOCATION STREAMING
    socket.on('update_location', ({ lat, lng, eventId }) => {
      // Broadcast to anyone listening for location updates
      io.emit('location_updated', {
        volunteerId: socket.user._id,
        volunteerName: socket.user.name,
        lat,
        lng,
        eventId
      });
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name}`);
    });
  });
};

module.exports = setupSocket;
