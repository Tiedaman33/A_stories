const Book = require('../models/bookModel');

// Controller to fetch books for a specific user
exports.getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }); // Fetch books for the authenticated user
    res.status(200).json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
