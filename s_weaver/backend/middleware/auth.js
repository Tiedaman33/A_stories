const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log('Token:', token); // Debug token

  // Ensure the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded); // Debug decoded data

    // Attach user data to request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Token verification error:', err.message); // Debug token verification error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
