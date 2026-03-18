const User = require('../models/User');
const { apiResponse } = require('../utils/helpers');

// POST /volunteers/rate
exports.rateVolunteer = async (req, res) => {
  try {
    const { volunteerId, rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return apiResponse(res, 400, false, 'Rating must be between 1 and 5');
    }

    const volunteer = await User.findById(volunteerId);
    if (!volunteer || volunteer.role !== 'volunteer') {
      return apiResponse(res, 404, false, 'Volunteer not found');
    }

    // Calculate new average rating
    const newCount = volunteer.ratingCount + 1;
    const newRating = ((volunteer.rating * volunteer.ratingCount) + rating) / newCount;

    volunteer.rating = Math.round(newRating * 100) / 100;
    volunteer.ratingCount = newCount;
    await volunteer.save();

    return apiResponse(res, 200, true, 'Volunteer rated successfully', {
      volunteerId,
      newRating: volunteer.rating,
      ratingCount: volunteer.ratingCount
    });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /volunteers
exports.getVolunteers = async (req, res) => {
  try {
    const filter = { role: 'volunteer' };
    if (req.query.available === 'true') filter.availability = true;
    if (req.query.skill) {
      filter.skills = { $in: [new RegExp(req.query.skill, 'i')] };
    }

    const volunteers = await User.find(filter).select('-password').sort({ rating: -1 });
    return apiResponse(res, 200, true, 'Volunteers fetched', volunteers);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// GET /volunteers/:id
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await User.findById(req.params.id).select('-password');
    if (!volunteer) {
      return apiResponse(res, 404, false, 'Volunteer not found');
    }
    return apiResponse(res, 200, true, 'Volunteer fetched', volunteer);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// PUT /volunteers/availability
exports.updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { availability },
      { new: true }
    );
    return apiResponse(res, 200, true, 'Availability updated', user);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
