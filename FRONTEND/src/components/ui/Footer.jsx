import React from 'react';
import { Link } from 'react-router-dom';
import orbitRedbg from '../../assets/orbitWhitebg.png'; 
import upminLogo from '../../assets/up.png'; 

const Footer = () => {
return (
    <footer className="orbit-footer">
    <div className="orbit-footer-container">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
        
        {/* BRANDING COLUMN: Expanded to fill the left side */}
        <div className="flex flex-grow items-center gap-8">
            <img src={orbitRedbg} alt="Campus Orbit" className="footer-logo-primary" />
            <img src={upminLogo} alt="UP Mindanao" className="footer-logo-secondary" />
        </div>

        {/* QUICK LINKS COLUMNS */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-white text-[18px] mb-2">Platform</h4>
            <Link to="/" className="orbit-footer-link">Home</Link>
            <Link to="/units" className="orbit-footer-link">Units</Link>
            <Link to="/ping" className="orbit-footer-link">Ping Now</Link>
            </div>
            <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-white text-[18px] mb-2">Information</h4>
            <Link to="/about" className="orbit-footer-link">About</Link>
            <Link to="/dashboard" className="orbit-footer-link">Dashboard</Link>
            <Link to="/login" className="orbit-footer-link">Login</Link>
            </div>
        </div>

        {/* SOCIALS & SLOGAN COLUMN: Slogan repositioned here */}
        <div className="flex flex-col gap-6 min-w-[280px]">
            <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-[18px]">Find us at:</h4>
            <div className="flex gap-4">
                <a href="#" className="orbit-social-icon"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="orbit-social-icon"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" className="orbit-social-icon"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="orbit-social-icon"><i className="fa-brands fa-linkedin"></i></a>
            </div>
            </div>

            {/* Slogan moved below Find us at */}
            <p className="footer-slogan-repositioned">
            Providing modern, real-time transit tracking for the UP Mindanao community.
            </p>
        </div>
        </div>

        {/* BOTTOM LEGAL STRIP */}
        <div className="w-full mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-[#999999] text-[14px]">
            © 2026 University of the Philippines Mindanao. All rights reserved.
        </p>
        <div className="flex gap-8">
            <Link to="#" className="orbit-footer-link !text-[14px]">Privacy Policy</Link>
            <Link to="#" className="orbit-footer-link !text-[14px]">Terms of Use</Link>
        </div>
        </div>

    </div>
    </footer>
);
};

export default Footer;