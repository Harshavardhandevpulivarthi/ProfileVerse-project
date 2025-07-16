import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserRegistrationForm() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [view, setView] = useState('landing');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(new Set());

  const handleInputChange = (e, setData) => {
    const { value } = e.target;
    setData(value);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleRegister = () => {
    if (!email || !mobileNumber || !username || !password) {
      setRegistrationMessage('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setRegistrationMessage('Invalid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setRegistrationMessage('Password must be at least 6 characters long.');
      return;
    }

    if (users.has(email)) {
      setRegistrationMessage('User already exists.');
      return;
    }

    setUsers(new Set([...users, email]));
    setRegistrationMessage('Registration successful!');
    setMobileNumber('');
    setEmail('');
    setUsername('');
    setPassword('');
    setView('login');
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginMessage('All fields are required.');
      return;
    }

    if (!validateEmail(loginEmail)) {
      setLoginMessage('Invalid email address.');
      return;
    }

    if (!validatePassword(loginPassword)) {
      setLoginMessage('Password must be at least 6 characters long.');
      return;
    }

    if (users.has(loginEmail)) {
      setLoginMessage('Login successful!');
      setIsLoggedIn(true);
      navigate('/home'); // Redirect to /home when login is successful
    } else {
      setLoginMessage('User does not exist. Please register.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  return (
    
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      {isLoggedIn ? (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Home</h1>
            <p className="text-lg text-gray-400 mb-8">You are logged in successfully.</p>
            <button onClick={handleLogout} className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Logout
            </button>
          </div>
        </div>
      ) : view === 'landing' ? (
        
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
          <p className="text-lg text-gray-400 mb-8">Get started by creating an account.</p>
          <button onClick={() => setView('login')} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Get Started
          </button>
        </div>
      ) : view === 'login' ? (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-400 mb-4">Enter your credentials to log in.</p>
          <div className="flex flex-col space-y-4">
            <input type="email" value={loginEmail} onChange={(e) => handleInputChange(e, setLoginEmail)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter email" />
            <input type="password" value={loginPassword} onChange={(e) => handleInputChange(e, setLoginPassword)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter password" />
            {loginMessage && <p className="text-red-500">{loginMessage}</p>}
            <button onClick={handleLogin} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Login
            </button>
            <p className="text-gray-400">
              Don't have an account? <span onClick={() => setView('register')} className="text-green-500 hover:underline cursor-pointer">Register</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">User Registration</h2>
          <div className="flex flex-col space-y-4">
            <input type="text" value={username} onChange={(e) => handleInputChange(e, setUsername)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter username" />
            <input type="text" value={mobileNumber} onChange={(e) => handleInputChange(e, setMobileNumber)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter mobile number" />
            <input type="email" value={email} onChange={(e) => handleInputChange(e, setEmail)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter email" />
            <input type="password" value={password} onChange={(e) => handleInputChange(e, setPassword)}
              className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Enter password" />
            {registrationMessage && <p className="text-red-500">{registrationMessage}</p>}
            <button onClick={handleRegister} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Register
            </button>
            <p className="text-gray-400">
              Already have an account? <span onClick={() => setView('login')} className="text-green-500 hover:underline cursor-pointer">Login</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}