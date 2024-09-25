const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/auth'); // Correct the path and name
const storyRoutes = require('./routes/storyRoutes');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend's origin
    credentials: true, // Allow credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers such as Authorization and Content-Type
}));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/users', bookRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
