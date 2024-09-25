const express = require('express');
const router = express.Router();
const { getUserBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');

// Route to get user's books
router.get('/books', auth, getUserBooks);

module.exports = router;
