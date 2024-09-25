const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log('Token received:', token); // Debug token

  // Ensure the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token payload:', decoded); // Debug decoded data

    // Ensure decoded has user and user.id
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    // Attach user data to request
    req.user = decoded.user; // Now req.user should have the correct structure (user.id)
    next();
  } catch (err) {
    console.log('Token verification error:', err.message); // Debug token verification error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
