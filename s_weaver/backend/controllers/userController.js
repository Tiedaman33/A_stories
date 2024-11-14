const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  const {
    firstName, lastName, email, password, username,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      username,
    });
//hasing the password before saving it 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
//generates a token after saving that has a payload of the user ID
    const payload = {
      user: {
        id: user.id,
      },
    };
//generate token using payload (user id) and the  process.env.JWT_SECRET
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Server error during registration:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Authenticate a user
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
         
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user }); // Include user data in response
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get user profile
const getUserProfile = async (req, res) => {
  try {
    
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};
