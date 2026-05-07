// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Import the new page

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* Placeholders */}
          <Route path="ping" element={<div className="p-20 text-center font-display text-2xl text-maroon">Ping Page (Auth Required)</div>} />
          <Route path="news" element={<div className="p-20 text-center font-display text-2xl">News Page Coming Soon</div>} />
          
          <Route path="*" element={<div className="p-20 text-center font-display text-2xl">404 - Orbit Out of Range</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;