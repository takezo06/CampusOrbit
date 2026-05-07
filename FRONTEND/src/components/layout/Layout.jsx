import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar.jsx';
import Footer from '../ui/Footer.jsx';

const Layout = () => {
return (
    <div className="w-full min-h-screen flex flex-col bg-white">
    <Navbar />
    
    {/* Content takes up remaining space so footer stays at bottom */}
    <div className="flex-grow">
        <Outlet />
    </div>
    
    <Footer />
    </div>
);
};

export default Layout;