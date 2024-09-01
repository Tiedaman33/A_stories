const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/userprofile', getUserProfile);

module.exports = router;
