/**
 * Notification service using Socket.io
 */

let ioInstance = null;

const init = (io) => {
  ioInstance = io;
};

const getIO = () => ioInstance;

/**
 * Send notification to a specific user
 */
const notifyUser = (userId, type, data) => {
  if (ioInstance) {
    ioInstance.to(`user_${userId}`).emit('notification', {
      type,
      ...data,
      timestamp: new Date()
    });
  }
};

/**
 * Send notification to all members of an event room
 */
const notifyEventRoom = (eventId, type, data) => {
  if (ioInstance) {
    ioInstance.to(`event_${eventId}`).emit('notification', {
      type,
      ...data,
      timestamp: new Date()
    });
  }
};

/**
 * Send emergency alert to specific users
 */
const sendEmergencyAlert = (userIds, eventData) => {
  if (ioInstance) {
    userIds.forEach(userId => {
      ioInstance.to(`user_${userId}`).emit('emergency_alert', {
        type: 'emergency',
        ...eventData,
        timestamp: new Date()
      });
    });
  }
};

/**
 * Send geo-fence alert to admin
 */
const sendGeoFenceAlert = (adminId, alertData) => {
  if (ioInstance) {
    ioInstance.to(`user_${adminId}`).emit('geo_fence_alert', {
      type: 'geo-fence',
      ...alertData,
      timestamp: new Date()
    });
  }
};

module.exports = { init, getIO, notifyUser, notifyEventRoom, sendEmergencyAlert, sendGeoFenceAlert };
