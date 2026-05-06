import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './App';
import './index.css'; // Your Golden Ratio customized PostCSS stylesheet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);