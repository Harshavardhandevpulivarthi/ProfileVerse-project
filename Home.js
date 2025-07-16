import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, MessageSquare } from 'lucide-react';
import ChatBox from './chatbox'; // ✅ Correct path (after moving ChatBox.js to src/)

export default function Home() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showChat, setShowChat] = useState(false); // Toggle chat visibility
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900 min-h-screen flex flex-col justify-between py-12 px-4 md:px-6 text-white">
      <header className="flex items-start justify-between relative">
        <div>
          <h1 className="text-4xl font-bold">Profile verse</h1>
          <div className="h-0.5 bg-white w-full max-w-sm mt-2"></div>
          <p className="mt-2 text-lg">Profiles&Portfolios</p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Notifications Icon */}
          <button className="relative p-2 hover:text-gray-300">
            <Bell size={24} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">{notifications}</span>
            )}
          </button>

          {/* AI Chatbot Icon */}
          <button className="relative p-2 hover:text-gray-300" onClick={() => setShowChat(!showChat)}>
            <MessageSquare size={24} />
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button className="p-2 hover:text-gray-300" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Settings size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navigate('/profile')}>
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navigate('/login')}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-2xl p-4 text-lg font-bold text-white bg-gray-800 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white"
        />
      </main>

      {/* Chatbox */}
      {showChat && <ChatBox />}

      <footer className="text-center">
        <div className="space-x-4">
          <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition duration-300 ease-in-out px-6 py-3" onClick={() => navigate('/about')}>
            About
          </button>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out px-6 py-3"
            onClick={() => navigate('/Create')}
          >
            Create
          </button>
        </div>
      </footer>
    </div>
  );
}
