import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar.jsx';
import Footer from '../ui/Footer.jsx';

const Layout = () => {
return (
    <div className="w-full min-h-screen flex flex-col bg-white">
    <Navbar />
    
    {/* Added 'content-wrapper' class to handle the bottom gap 
        and flex-grow to push footer to the bottom of the viewport
    */}
    <main className="flex-grow content-wrapper">
        <Outlet />
    </main>
    
    <Footer />
    </div>
);
};

export default Layout;