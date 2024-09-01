/* import React, { useState } from 'react';
import AuthForm from './AuthForm'; // Correct import path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignupSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', formData);
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      // Log full error response
      console.error('Signup error:', error);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <AuthForm isSignup={true} handleSubmit={handleSignupSubmit} />
      </div>
    </div>
  );
}

export default Signup;
*/
