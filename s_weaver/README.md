StoryWeaver
Introduction
StoryWeaver is an interactive storytelling platform that allows users to create, share, and explore engaging stories. Users can register, log in, view their profile, upload new stories, and browse through a collection of featured stories.

# Development Frameworks and Tools
The StoryWeaver project was developed using the following frameworks and tools:

Frontend: Built with React for dynamic and responsive user interfaces. Styling is handled with Tailwind CSS to achieve a modern, mobile-friendly design.
Backend: Developed using Node.js and Express for creating API routes and handling server-side logic.
Database: MongoDB is used as the database, with Mongoose for schema management and data modeling.
Authentication: User authentication is managed with JSON Web Tokens (JWT) for secure session handling.
HTTP Client: Axios is used for client-server communication, handling data fetching and form submissions.
Environment Management: .env files are used for secure configuration of sensitive information like database URIs and secret keys.

Author
LinkedIn - (https://www.linkedin.com/in/bravin-orina-3400451a8/)
Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/Tiedaman33/A_stories
cd s_weaver
Install dependencies for both the frontend and backend:

# Install frontend dependencies3
npm install

# Install backend dependencies
cd /s_weaver/backend
npm install
Configure environment variables:

Create a .env file in the backend directory with the following content:
MONGODB_URI=mongodb://localhost:27017/storyweaver
PORT=5000
JWT_SECRET=dankalian

Start the development servers:

# Start the backend server
cd backend
node server.js

# Start the frontend server
cd /s_weaver
npm start
Access the application:

Open your browser and navigate to http://localhost:3000.
# Usage
Register a new account or log in with an existing account.
After logging in, you will be redirected to your dashboard where you can:
View your profile
Upload new stories
Browse featured stories
Use the navigation links to explore different sections of the platform.
Contributing
Contributions are welcome! To contribute:

# Fork the repository.
Create a new branch:

git checkout -b feature-branch
Make your changes.
Commit your changes:

git commit -m 'Add some feature'
Push to the branch:
bash

git push origin feature-branch
Open a pull request.


Notes
# Resolved Issues:
Fixed the issue with fetching the current user data by using setUserData(response.data) directly from the Axios response, since Axios automatically handles JSON parsing.
# Upcoming Hosting:
Plans are in place for deployment at Visit the Deployed Site, pending finalization.