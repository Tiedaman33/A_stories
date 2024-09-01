const express = require('express');

const router = express.Router();
const {
  uploadStory,
  getStories,
  deleteStory,
} = require('../controllers/storyController');
const auth = require('../middleware/auth');

// Route to upload a new story
router.post('/upload', auth, uploadStory);

// Route to get all stories
router.get('/', auth, getStories);

// Route to delete a specific story
router.delete('/:storyId', auth, deleteStory);

module.exports = router;
