// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this Route will share the Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          
          {/* Home Page (index) */}
          <Route index element={<HomePage />} />
          
          {/* Units Page */}
          <Route path="units" element={<UnitsPage />} />
          
          {/* About Page */}
          <Route path="about" element={<AboutPage />} />
          
          {/* Login Page */}
          <Route path="login" element={<LoginPage />} />

          {/* Placeholders for routes you're still building */}
          <Route path="ping" element={<div className="p-20 text-center font-display text-2xl">Ping Page Coming Soon</div>} />
          <Route path="news" element={<div className="p-20 text-center font-display text-2xl">News Page Coming Soon</div>} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<div className="p-20 text-center font-display text-2xl">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;