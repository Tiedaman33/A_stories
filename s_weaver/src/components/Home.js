import React, { useState, useEffect } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import StoryList from './StoryList'; 
import FeaturedStories from './FeaturedStories'; 

const Home = () => {
  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]); // State to hold general stories
  const [featuredStories, setFeaturedStories] = useState([]); // State to hold featured stories
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/profile', { 
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };

    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stories'); 
        if (response.ok) {
          const data = await response.json();
          setStories(data); // Set the stories in the state
        } else {
          console.error('Failed to fetch stories:', response.status);
        }
      } catch (err) {
        console.error('Error fetching stories:', err);
      }
    };

    const fetchFeaturedStories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stories/featured'); 
        if (response.ok) {
          const data = await response.json();
          setFeaturedStories(data); // Set the featured stories in the state
        } else {
          console.error('Failed to fetch featured stories:', response.status);
        }
      } catch (err) {
        console.error('Error fetching featured stories:', err);
      }
    };

    fetchUser(); // Fetch user data if available
    fetchStories(); // Fetch all stories when the component mounts
    fetchFeaturedStories(); // Fetch featured stories when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto max-w-6xl p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">StoryWeaver</h1>
          <nav className="space-x-4">
            <a href="/" className="text-lg font-semibold text-white hover:underline">Home</a>
            <a href="/userprofile" className="text-lg font-semibold text-white hover:underline">Browse Stories</a>
            {user ? (
              <a href="/dashboard" className="text-lg font-semibold text-white hover:underline">Dashboard</a>
            ) : (
              <a href="/userprofile" className="text-lg font-semibold text-white hover:underline">Login</a>
            )}
          </nav>
        </header>
  
        {/* User Info */}
        {user && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome, {user.firstName}!</h2>
            <p className="text-lg">Email: {user.email}</p>
            <p className="text-lg">Username: {user.username}</p>
          </div>
        )}
  
        {/* Search Input */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full max-w-md px-4 py-2 rounded-lg text-gray-800 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
  
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Stories */}
          <section className="w-full bg-white rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-xl">Featured Stories</h2>
            <FeaturedStories stories={featuredStories} /> {/* Pass featured stories to FeaturedStories */}
          </section>
  
          {/* Story List */}
          <section className="w-full bg-white rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-xl">Story List</h2>
            <StoryList stories={stories} /> {/* Pass stories to StoryList */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
