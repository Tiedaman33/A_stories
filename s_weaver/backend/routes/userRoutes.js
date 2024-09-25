const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/userprofile', authMiddleware, getUserProfile);

module.exports = router;
