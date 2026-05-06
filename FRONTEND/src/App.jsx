import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import DashboardPage from './pages/DashboardPage'; // For later use

function App() {
  return (
    <Router>
      <Routes>
        {/* Set the wireframe Home Page as your default lander */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;