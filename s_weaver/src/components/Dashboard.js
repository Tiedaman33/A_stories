import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../redux/storiesSlice';
import FeaturedStories from './FeaturedStories';
import StoryList from './StoryList';

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState({ title: '', content: '' });
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.storiesList || []); // Ensure it defaults to an empty array

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        navigate('/login');
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:5000/api/users/userprofile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        const storiesResponse = await axios.get('http://localhost:5000/api/stories', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        dispatch(setStories(storiesResponse.data));
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch user data or stories.');
        localStorage.removeItem('token');
        navigate('/userprofile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  const handleStoryChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleUploadStory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/api/stories/upload', story, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        dispatch(setStories([...stories, response.data]));
        setStory({ title: '', content: '' });
        alert('Story uploaded successfully!');
      } catch (err) {
        console.error('Failed to upload story:', err);
        setError('Failed to upload story.');
      }
    } else {
      setError('No token found. Please log in again.');
    }
  };

  const handleDeleteStory = async (storyId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`http://localhost:5000/api/stories/${storyId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        dispatch(setStories(stories.filter((s) => s._id !== storyId)));
      } catch (err) {
        console.error('Failed to delete story:', err);
        setError('Failed to delete story.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/login')} className="btn">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto max-w-6xl p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 bg-white rounded-lg p-4 shadow-lg">
          <h1 className="text-4xl font-bold text-blue-600">StoryWeaver</h1>
          <nav className="space-x-4">
            <a href="/" className="text-lg font-semibold text-blue-600 hover:text-purple-500">Home</a>
            <a href="/browse" className="text-lg font-semibold text-blue-600 hover:text-purple-500">Browse Stories</a>
            <a href="/dashboard" className="text-lg font-semibold text-blue-600 hover:text-purple-500">Profile</a>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
              }}
              className="text-lg font-semibold text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition duration-300"
            >
              Logout
            </button>
          </nav>
        </header>

        {/* User Info */}
        <div className="mb-10 text-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-2 text-purple-600">Welcome, {userData?.firstName}!</h2>
          <p className="text-lg">Email: {userData?.email}</p>
          <p className="text-lg">Username: {userData?.username}</p>
        </div>

        {/* Upload Story Form */}
        <div className="flex items-center justify-center mb-10">
          <form onSubmit={handleUploadStory} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Upload a New Story</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-black">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Story title"
                onChange={handleStoryChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-black">Content</label>
              <textarea
                name="content"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Story content"
                rows="5"
                onChange={handleStoryChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
              Upload Story
            </button>
          </form>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Stories */}
          <section className="bg-white rounded-xl shadow-lg text-gray-900 p-6 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Featured Stories</h2>
            <FeaturedStories />
          </section>

          {/* Story List */}
          <section className="bg-white rounded-xl shadow-lg text-gray-900 p-6 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Story List</h2>
            <StoryList stories={stories} onDelete={handleDeleteStory} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;