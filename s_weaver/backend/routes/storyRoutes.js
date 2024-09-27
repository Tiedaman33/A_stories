const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    uploadStory,
    getStories,
    deleteStory,
} = require('../controllers/storyController');
const auth = require('../middleware/auth');
const upload = multer({ dest: 'stories/' });

// Route to upload a new story
router.post('/upload', auth, upload.single('storyFile'), async (req, res) => {
  try {
      await uploadStory(req, res);
  } catch (error) {
      console.error('Error uploading story:', error);
      res.status(500).json({ message: 'Failed to upload story' });
  }
});

// Route to get all stories
router.get('/', auth, getStories);

// Route to delete a specific story
router.delete('/:storyId', auth, async (req, res) => {
    const { storyId } = req.params;
    try {
        await deleteStory(storyId);
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        console.error('Error deleting story:', error);
        res.status(500).json({ message: 'Failed to delete story' });
    }
});

module.exports = router;
