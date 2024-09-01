/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthForm from './AuthForm';
import axios from 'axios';

const UserProfile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        setMessage(`Login successful: Welcome ${res.data.user.name}`);
      } else {
        await axios.post('http://localhost:5000/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setMessage('Signup successful: Please login');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <div className="user-profile bg-white text-gray-800 p-6 rounded-lg shadow-md">
      {message && <p className="mb-4 text-red-500">{message}</p>}
      {isLogin ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="mx-auto w-full p-2 border rounded-lg"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold mx-auto">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <button type="button" onClick={toggleForm} className="text-blue-500 font-semibold">Sign up</button>
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold mx-auto">
              Sign Up
            </button>
          </form>
          <p className="mt-2 text-center">
            Already have an account?{' '}
            <button type="button" onClick={toggleForm} className="text-blue-500 font-semibold">Login</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile; */
