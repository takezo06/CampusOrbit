// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page Imports - Using standard imports for now
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PingPage from './pages/PingPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper for all Campus Orbit pages */}
        <Route path="/" element={<Layout />}>
          
          {/* Public Guest Routes */}
          <Route index element={<HomePage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Feature Route (Anonymous/Guest allowed) */}
          <Route path="ping" element={<PingPage />} />

          {/* Authentication Flow */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* Future Routes / Placeholder */}
          <Route path="dashboard" element={<DashboardPage />} />          
          {/* 404 - Handle out-of-bounds routes */}
          <Route path="*" element={
            <div className="p-20 text-center flex flex-col items-center gap-6">
              <h2 className="font-display font-bold text-4xl text-[#840000]">404</h2>
              <p className="font-body text-xl text-[#757373]">Orbit out of range. This page doesn't exist.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;