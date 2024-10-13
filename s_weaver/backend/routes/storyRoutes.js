const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Story = require('../models/storyModel'); // Adjust the path as necessary
const authMiddleware = require('../middleware/auth'); // Import your auth middleware

const router = express.Router();

// Ensure the upload directory is writable by the server
const uploadPath = path.join(__dirname, '../uploads'); // Set the upload directory

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/ /g, '_'); // Replace spaces with underscores
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|txt/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed.'));
    }
});

// Route for fetching all stories
//implement pagination if appgrows to handle large number of stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find(); // Fetch all stories from the database
        res.status(200).json(stories); // Return the stories as a JSON response
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Route for fetching featured stories
router.get('/featured', async (req, res) => {
    try {
        const featuredStories = await Story.find({ featured: true }); // Fetch only featured stories
        res.status(200).json(featuredStories); // Return the featured stories as a JSON response
    } catch (error) {
        console.error('Error fetching featured stories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for uploading a story
router.post('/upload', authMiddleware, upload.single('storyFile'), async (req, res) => {
    try {
        const { title, genre, datePublished } = req.body;
        const storyFile = req.file;

        // Validate the request
        if (!title || !genre || !datePublished || !storyFile) {
            return res.status(400).json({ message: 'Title and genre are required' });
        }
        if (!storyFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new story instance
        const story = new Story({
            title,
            genre,
            datePublished,
            filePath: storyFile.path,
            user: req.user.id // from authenticated user
        });

        await story.save(); // Save the story to the database
        res.status(201).json({ message: 'Story uploaded successfully', story });
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
