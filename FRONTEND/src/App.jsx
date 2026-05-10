// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PingPage from './pages/PingPage';
import DashboardPage from './pages/DashboardPage';

// Admin Page (Imported from your sidecar directory)
import AdminPingsPage from './pages/admin/AdminPingsPage';
import AdminUnitsPage from './pages/admin/AdminUnitsPage';

/** * DEVELOPMENT_MODE Toggle
 * Set to 'true' to access /admin/pings without a real login.
 * Set to 'false' once your teammates finish the AuthController.
 */
const DEVELOPMENT_MODE = true; 

// Admin Guard Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('user_role');

  if (DEVELOPMENT_MODE) return children;

  // Real logic: Only allow access if token exists and role is 'admin'
  if (!token || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper for all Campus Orbit pages */}
        <Route path="/" element={<Layout />}>
          
          {/* Public Guest Routes (Login is optional) */}
          <Route index element={<HomePage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Feature Route (Anonymous/Guest allowed) */}
          <Route path="ping" element={<PingPage />} />

          {/* Authentication Flow */}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* User Protected Routes */}
          <Route path="dashboard" element={<DashboardPage />} />          

          {/* Admin Sidecar Routes */}
          <Route 
            path="admin/pings" 
            element={
              <AdminRoute>
                <AdminPingsPage />
              </AdminRoute>
            } 
          
          />
          <Route 
            path="admin/units" 
            element={
              <AdminRoute>
                <AdminUnitsPage />
              </AdminRoute>
            } 
          />

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