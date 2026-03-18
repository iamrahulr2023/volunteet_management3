const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Chat = require('../models/Chat');
const { calculateDistance } = require('../utils/helpers');

/**
 * Auto-assign volunteers to an event based on:
 * - Skill match
 * - Availability
 * - Distance within radius
 * - Sorted by: highest rating, lowest workCount (fair distribution)
 */
const autoAssign = async (event, io) => {
  try {
    // Get already-assigned volunteer IDs for this event
    const existingAssignments = await Assignment.find({
      eventId: event._id,
      status: { $in: ['pending', 'accepted'] }
    });
    const assignedIds = existingAssignments.map(a => a.volunteerId.toString());

    // Count how many more volunteers are needed
    const acceptedCount = existingAssignments.filter(a => a.status === 'accepted').length;
    const pendingCount = existingAssignments.filter(a => a.status === 'pending').length;
    const needed = event.requiredVolunteers - acceptedCount - pendingCount;

    if (needed <= 0) return [];

    // Find eligible volunteers
    const volunteers = await User.find({
      role: 'volunteer',
      availability: true,
      _id: { $nin: assignedIds }
    });

    // Filter by skill match and distance
    const eligible = volunteers
      .map(v => {
        const distance = calculateDistance(
          v.location.lat, v.location.lng,
          event.location.lat, event.location.lng
        );
        let skillMatchCount = 0;
        if (event.requiredSkills.length > 0) {
          skillMatchCount = v.skills.filter(s =>
            event.requiredSkills.map(rs => rs.toLowerCase()).includes(s.toLowerCase())
          ).length;
        }
        
        // A volunteer is eligible if they have matched skills, OR they are within distance
        // We will score them to rank them
        let score = 0;
        
        const isWithinDistance = distance <= event.radius;
        const hasSkillMatch = skillMatchCount > 0 || event.requiredSkills.length === 0;

        // Base criteria: must either be close enough or have specific skills needed
        // If event requires skills, prioritize those who have them
        if (event.requiredSkills.length > 0 && skillMatchCount === 0 && !isWithinDistance) {
            return { volunteer: v, distance, skillMatchCount, eligible: false }; // Too far and no skills
        }

        // Add to score
        score += skillMatchCount * 50; // High weight for skills
        if (isWithinDistance) score += 20;
        score -= distance; // slight penalty for distance
        score += v.rating * 5; // Reward good ratings
        score -= v.workCount; // Fair distribution

        return { volunteer: v, distance, skillMatchCount, score, eligible: true };
      })
      .filter(v => v.eligible)
      .sort((a, b) => b.score - a.score); // Highest score first

    // Select top N
    const selected = eligible.slice(0, needed);

    // Create assignments
    const assignments = [];
    for (const item of selected) {
      const assignment = await Assignment.create({
        eventId: event._id,
        volunteerId: item.volunteer._id,
        status: 'pending',
        assignedAt: new Date()
      });
      assignments.push(assignment);

      // Notify volunteer via Socket.io
      if (io) {
        io.to(`user_${item.volunteer._id}`).emit('notification', {
          type: 'assignment',
          message: `You have been assigned to event: ${event.title}`,
          eventId: event._id,
          assignmentId: assignment._id
        });
      }
    }

    return assignments;
  } catch (error) {
    console.error('Auto-assign error:', error.message);
    return [];
  }
};

/**
 * Find the next best available volunteer for reassignment
 */
const reassign = async (event, excludeIds = [], io) => {
  try {
    // Get all currently assigned/pending volunteers
    const existing = await Assignment.find({
      eventId: event._id,
      status: { $in: ['pending', 'accepted'] }
    });
    const allExcluded = [
      ...existing.map(a => a.volunteerId.toString()),
      ...excludeIds.map(id => id.toString())
    ];

    // Also exclude rejected/removed volunteers from this event
    const rejected = await Assignment.find({
      eventId: event._id,
      status: { $in: ['rejected', 'removed'] }
    });
    const rejectedIds = rejected.map(a => a.volunteerId.toString());
    const finalExcluded = [...new Set([...allExcluded, ...rejectedIds])];

    const volunteers = await User.find({
      role: 'volunteer',
      availability: true,
      _id: { $nin: finalExcluded }
    });

    const eligible = volunteers
      .map(v => {
        const distance = calculateDistance(
          v.location.lat, v.location.lng,
          event.location.lat, event.location.lng
        );
        let skillMatchCount = 0;
        if (event.requiredSkills.length > 0) {
          skillMatchCount = v.skills.filter(s =>
            event.requiredSkills.map(rs => rs.toLowerCase()).includes(s.toLowerCase())
          ).length;
        }
        
        // A volunteer is eligible if they have matched skills, OR they are within distance
        let score = 0;
        
        const isWithinDistance = distance <= event.radius;

        // Base criteria: must either be close enough or have specific skills needed
        if (event.requiredSkills.length > 0 && skillMatchCount === 0 && !isWithinDistance) {
            return { volunteer: v, distance, score, eligible: false }; // Too far and no skills
        }

        // Add to score
        score += skillMatchCount * 50; // High weight for skills
        if (isWithinDistance) score += 20;
        score -= distance; // slight penalty for distance
        score += v.rating * 5; // Reward good ratings
        score -= v.workCount; // Fair distribution

        return { volunteer: v, distance, score, eligible: true };
      })
      .filter(v => v.eligible)
      .sort((a, b) => b.score - a.score);

    if (eligible.length === 0) return null;

    const best = eligible[0];
    const assignment = await Assignment.create({
      eventId: event._id,
      volunteerId: best.volunteer._id,
      status: 'pending',
      assignedAt: new Date()
    });

    // Notify the reassigned volunteer
    if (io) {
      io.to(`user_${best.volunteer._id}`).emit('notification', {
        type: 'assignment',
        message: `You have been reassigned to event: ${event.title}`,
        eventId: event._id,
        assignmentId: assignment._id
      });
    }

    return assignment;
  } catch (error) {
    console.error('Reassignment error:', error.message);
    return null;
  }
};

/**
 * Add volunteer to event chat when they accept
 */
const addToChatOnAccept = async (eventId, volunteerId) => {
  try {
    let chat = await Chat.findOne({ eventId });
    if (!chat) {
      const Event = require('../models/Event');
      const event = await Event.findById(eventId);
      chat = await Chat.create({
        eventId,
        members: [event.createdBy, volunteerId]
      });
    } else if (!chat.members.includes(volunteerId)) {
      chat.members.push(volunteerId);
      await chat.save();
    }
    return chat;
  } catch (error) {
    console.error('Add to chat error:', error.message);
  }
};

/**
 * Ensure group chat is created when all required volunteers are assigned
 */
const ensureChatCreated = async (eventId) => {
  try {
    const Event = require('../models/Event');
    const event = await Event.findById(eventId);
    if (!event) return;

    // Get assigned volunteers (both pending and accepted)
    const assignments = await Assignment.find({
      eventId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (assignments.length >= event.requiredVolunteers) {
      const volunteerIds = assignments.map(a => a.volunteerId);
      
      let chat = await Chat.findOne({ eventId });
      if (!chat) {
        await Chat.create({
          eventId,
          members: [event.createdBy, ...volunteerIds]
        });
      } else {
        // Add any missing members
        const currentMembers = chat.members.map(m => m.toString());
        let updated = false;
        
        for (const vid of volunteerIds) {
          if (!currentMembers.includes(vid.toString())) {
            chat.members.push(vid);
            currentMembers.push(vid.toString());
            updated = true;
          }
        }
        
        if (!currentMembers.includes(event.createdBy.toString())) {
           chat.members.push(event.createdBy);
           updated = true;
        }

        if (updated) {
          await chat.save();
        }
      }
    }
  } catch (error) {
    console.error('Ensure chat created error:', error.message);
  }
};

module.exports = { autoAssign, reassign, addToChatOnAccept, ensureChatCreated };
