const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/auth'); // Correct the path and name
const storyRoutes = require('./routes/storyRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/stories', authMiddleware, storyRoutes); // Use the middleware here

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
