const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true, // Set to false if optional
  },
  datePublished: {
    type: Date,
    required: true, // Set to false if optional
  },
  filePath: {
    type: String, // Store the path of the uploaded file
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you're referencing a User model
    required: true,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
