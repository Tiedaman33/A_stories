import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserProfile = ({ isLogin: initialIsLogin = true }) => {
  const user = useSelector(state => state.user);
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/users/login', {
          email: formData.email,
          password: formData.password
        });
        if (res) {
          const { token, user } = res.data
          
          //check if the user and token are definned
          if (!token) {
            throw new Error('Token not received');
          }

          const userData = user || {};
          const userEmail = userData.email || 'invalid email';
          setMessage(`Login successful: Welcome ${userEmail}`);
          
          //stroe toke in locak storage
          localStorage.setItem('token', token);
          navigate('/dashboard');
        }
      } else {
        await axios.post('http://localhost:5000/api/users/signup', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        setMessage('Signup successful: Please login');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {message && <p className="mb-4 text-red-500">{message}</p>}
        {isLogin ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
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
                Login
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button type="button" onClick={toggleForm} className="text-blue-500 font-semibold">
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your username"
                  value={formData.username}
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
              <button type="button" onClick={toggleForm} className="text-blue-500 font-semibold">
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
