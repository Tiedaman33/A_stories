const mongoose = require('mongoose');
const Story = require('../models/storyModel'); // Import the Story model

// Controller to handle uploading a new story
exports.uploadStory = async (req, res) => {
  const { title, genre, datePublished } = req.body;

  console.log('Received file:', req.file);

  // Check if the file was uploaded
  if (!req.file) {
      return res.status(400).json({ message: 'File not uploaded. Please select a file.' });
  }

  const filePath = req.file.path; // Get the path of the uploaded file

  // Validate required fields
  if (!title || !genre || !datePublished) {
      return res.status(400).json({ message: 'Title, genre, and datePublished are required.' });
  }

  try {
      const newStory = new Story({
          title,
          genre,
          datePublished,
          filePath,
          user: req.user.id,
      });
      await newStory.save();
      res.status(201).json(newStory);
  } catch (err) {
      console.error('Error uploading story:', err);
      res.status(500).json({ message: 'Server error' });
  }
};


// Controller to handle fetching all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }); // Fetch stories for the authenticated user
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle deleting a specific story
exports.deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: 'Invalid story ID' });
    }

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    await Story.findByIdAndDelete(storyId);

    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
