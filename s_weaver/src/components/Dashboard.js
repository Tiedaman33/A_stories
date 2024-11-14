import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../redux/storiesSlice';
import FeaturedStories from './FeaturedStories';
import StoryList from './StoryList';

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [storyData, setStoryData] = useState({
    title: '',
    genre: '',
    datePublished: new Date().toISOString().split('T')[0],
    storyFile: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.storiesList);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      const userResponse = await axios.get('http://localhost:5000/api/users/userprofile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(userResponse.data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to fetch user data.');
      localStorage.removeItem('token');
      navigate('/userprofile');
    }
  };
   // Function to fetch featured stories from API
   const fetchFeaturedStories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stories'); 
      setFeaturedStories(response.data.slice(0, 10)); // Limit to first 10 stories
    } catch (error) {
      console.error("Error fetching featured stories:", error);
    }
  };

  const fetchStories = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const storiesResponse = await axios.get('http://localhost:5000/api/stories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setStories(storiesResponse.data));
      console.log('Updated stories in Redux:', storiesResponse.data);
    } catch (err) {
      console.error('Failed to fetch stories:', err);
      setError('Failed to fetch stories.');
      localStorage.removeItem('token');
      navigate('/userprofile');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchUserData();
    await fetchStories();
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      navigate('/login');
      return;
    }

    fetchData();
  }, [dispatch, navigate]);

  const handleUploadStory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', storyData.title);
    formData.append('genre', storyData.genre);
    formData.append('datePublished', storyData.datePublished);
    formData.append('storyFile', storyData.storyFile);

    if (token) {
      try {
        await axios.post('http://localhost:5000/api/stories/upload', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            
          },
        });

        alert('Story uploaded successfully!');
        setStoryData({
          title: '',
          genre: '',
          datePublished: new Date().toISOString().split('T')[0],
          storyFile: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Reset the file input
        }
        fetchStories(); // Fetch stories after upload to refresh the list
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
          headers: { Authorization: `Bearer ${token}` },
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

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setStoryData((prevData) => ({
        ...prevData,
        storyFile: file,
      }));
      console.log('File uploaded:', file);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCardClick = (storyId) => {
    navigate(`/stories/${storyId}`);
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
          <h1 className="text-3xl font-bold text-blue-600">StoryWeaver</h1>
          <nav className="flex items-center space-x-4">
            <a href="/" className="text-lg font-semibold text-blue-600 hover:text-purple-500">Home</a>
            <a href="/browse" className="text-lg font-semibold text-blue-600 hover:text-purple-500">Browse Stories</a>
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center text-lg font-semibold text-blue-600 focus:outline-none">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {userData && userData.username ? userData.username.charAt(0).toUpperCase() : '?'}
                </span>
                <span className="ml-2">{userData ? userData.username : 'User'}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                  <li className="px-4 py-2 hover:bg-gray-100"><a href="/profile">My Profile</a></li>
                  <li className="px-4 py-2 hover:bg-gray-100"><a href="/inbox">Inbox</a></li>
                  <li className="px-4 py-2 hover:bg-gray-100"><a href="/notifications">Notifications</a></li>
                  <li className="px-4 py-2 hover:bg-gray-100"><a href="/library">Library</a></li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          </nav>
        </header>
  
        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Upload Story Form */}
          <div className="col-span-1 flex flex-col">
            <form onSubmit={handleUploadStory} className="bg-white p-6 rounded-lg shadow-md flex-grow">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Upload a New Story</h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Story title"
                  onChange={handleStoryChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Genre</label>
                <input
                  type="text"
                  name="genre"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Story genre"
                  onChange={handleStoryChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Date Published</label>
                <input
                  type="date"
                  name="datePublished"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  onChange={handleStoryChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Upload Story File</label>
                <input
                  type="file"
                  name="storyFile"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  onChange={handleFileUpload}
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                Upload Story
              </button>
            </form>
          </div>
  
          {/* Featured Stories and Story List Sections */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Featured Stories Section */}
            <section className="bg-white rounded-xl shadow-lg text-gray-900 p-6 flex-grow max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-purple-600">Featured Stories</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex space-x-4">
                  <FeaturedStories />
                </div>
              </div>
            </section>
  
            {/* Story List Section */}
            <section className="bg-white rounded-xl shadow-lg text-gray-900 p-6 flex-grow max-h-[50vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-purple-600">Story List</h2>
              <div className="flex flex-wrap gap-4">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="transform transition-transform duration-500 ease-in-out hover:scale-105 p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px] max-w-[200px] flex flex-col cursor-pointer"
                    onClick={() => handleStoryClick(story.id)} // Handle the story click to redirect to the story content
                  >
                    <h3 className="text-xl font-semibold text-black overflow-hidden text-ellipsis whitespace-nowrap">{story.title}</h3>
                    <p className="text-gray-700 flex-grow">{story.description}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteStory(story.id); }} // Prevents the click event from triggering on the card
                      className="mt-2 bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 mt-10">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} StoryWeaver. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
  
};
export default Dashboard;  