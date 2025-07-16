import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistrationForm from './UserRegistrationForm';
import Home from './Home';
import AboutPage from './about';
import Create from './Create'; // Corrected Import

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserRegistrationForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<UserRegistrationForm />} />
          <Route path="/create" element={<Create />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
