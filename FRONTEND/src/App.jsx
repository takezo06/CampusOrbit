import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Structure Components
import Layout from './components/layout/Layout.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import UnitsPage from './pages/UnitsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const PingNowPage = () => (
  <div className="w-full flex-grow flex items-center justify-center bg-white font-body text-[32px] font-bold text-[#4e0000]">
    Ping Now Portal Coming Soon
  </div>
);

const NewsPage = () => (
  <div className="w-full flex-grow flex items-center justify-center bg-white font-body text-[32px] font-bold text-[#4e0000]">
    News & Announcements Portal Coming Soon
  </div>
);

const LoginPage = () => (
  <div className="w-full flex-grow flex items-center justify-center bg-white font-body text-[32px] font-bold text-[#4e0000]">
    Authentication Portal Coming Soon
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Everything wrapped nested in here inherits the constant Navbar shell layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/ping" element={<PingNowPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        
        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;