import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Adjust as needed
import UserProfile from './components/UserProfile/UserProfile'; // Import the unified UserProfile component
import Dashboard from './components/Dashboard'; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
