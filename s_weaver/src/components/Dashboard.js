import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryList from './StoryList';
import FeaturedStories from './FeaturedStories';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const fetchUserData = () => {
    
    try {
      // get token from browser
      const token = localStorage.getItem('token');
      console.log(token)


    } catch {

    }
    // if (!token) {
    //   return Promise.reject('No token found');
    // }
    // return fetch('http://localhost:7000/api/users/userprofile', {
    //   headers: { 
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   setUserData(data);
    //   return fetchStories(); // Fetch stories after user data is loaded
    // })
    // .catch(err => {
    //   console.error('Failed to fetch user data:', err);
    //   setError('Failed to fetch user data.');
    //   localStorage.removeItem('token');
    //   navigate('/login'); // Redirect to login if fetching user data fails
    // });
  };

  const fetchStories = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject('No token found');
    }

    return fetch('http://localhost:7000/api/stories', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setStories(data);
    })
    .catch(err => {
      console.error('Failed to fetch stories:', err);
      setError('Failed to fetch stories.');
    });
  };

  useEffect(() => {
    fetchUserData()
      .finally(() => setLoading(false)); // Set loading to false once fetchUserData is resolved or rejected
  }, []);

  const handleStoryChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleUploadStory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:7000/api/stories/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(story),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const newStory = await response.json();
        setStories([...stories, newStory]);  // Update the list of stories
        setStory({ title: '', content: '' });  // Clear the form fields
  
        alert('Story uploaded successfully!');
      } catch (err) {
        console.error('Failed to upload story:', err);
        setError('Failed to upload story.');
      }
    }
  };

  const handleDeleteStory = async (storyId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`http://localhost:7000/api/stories/${storyId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setStories(stories.filter(story => story._id !== storyId));
      } catch (err) {
        console.error('Failed to delete story:', err);
        setError('Failed to delete story.');
      }
    }
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
    <div className="home min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto max-w-4xl p-1">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">StoryWeaver</h1>
          <nav className="space-x-4">
            <a href="/" className="text-lg font-semibold text-white">Home</a>
            <a href="/browse" className="text-lg font-semibold text-white">Browse Stories</a>
            <a href="/dashboard" className="text-lg font-semibold text-white">Profile</a>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
              }}
              className="text-lg font-semibold text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </nav>
        </header>

        {/* User Info */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome, {userData?.firstName}!</h2>
          <p className="text-lg">Email: {userData?.email}</p>
          <p className="text-lg">Username: {userData?.username}</p>
        </div>

        {/* Upload Story Form */}
        <div className="flex items-center justify-center min-h-screen">
          <form onSubmit={handleUploadStory} className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Upload a New Story</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-black">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded-lg text-black"
                placeholder="Story title"
                value={story.title}
                onChange={handleStoryChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-black">Content</label>
              <textarea
                name="content"
                className="w-full p-2 border rounded-lg text-black"
                placeholder="Story content"
                rows="5"
                value={story.content}
                onChange={handleStoryChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold">
              Upload Story
            </button>
          </form>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Stories */}
          <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-xl">Featured Stories</h2>
            <FeaturedStories />
          </section>

          {/* Story List */}
          <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-t-xl">Story List</h2>
            <StoryList stories={stories} onDelete={handleDeleteStory} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
