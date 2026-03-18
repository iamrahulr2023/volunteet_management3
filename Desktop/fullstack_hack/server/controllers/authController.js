const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { apiResponse } = require('../utils/helpers');

// POST /auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone, skills, location } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiResponse(res, 400, false, 'Email already registered');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'volunteer',
      phone: phone || '',
      skills: skills || [],
      location: location || { lat: 0, lng: 0 }
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return apiResponse(res, 201, true, 'User registered successfully', { user, token });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return apiResponse(res, 400, false, 'Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse(res, 401, false, 'Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return apiResponse(res, 401, false, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return apiResponse(res, 200, true, 'Login successful', { user, token });
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
