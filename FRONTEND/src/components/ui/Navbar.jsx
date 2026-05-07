import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import orbitLogo from '../../assets/orbit.png'; 
import upminLogo from '../../assets/up.png'; 

const Navbar = () => {
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);
const location = useLocation();

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Units", path: "/units" },
    { label: "Ping Now", path: "/ping" },
    { label: "About", path: "/about" },
    { label: "Dashboard", path: "/dashboard" }
];

// Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

return (
    <nav className="orbit-nav">
    
    {/* Orbit logo set as a Link to Home ("/") */}
    <div className="orbit-logo-track">
        <Link to="/" className="flex items-center">
        <img src={orbitLogo} alt="Campus Orbit" className="w-[160px] h-[72px] object-contain cursor-pointer" />
        </Link>
        <img src={upminLogo} alt="UP Mindanao" className="w-[78.5px] h-[67.6px] object-contain" />
    </div>

    <div className="orbit-action-track">
        <div className="hidden md:flex items-center gap-ratio-sm">
        {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
            <div key={idx} className="orbit-nav-item-container">
                <Link 
                to={link.path} 
                className={`orbit-nav-link ${isActive ? 'orbit-nav-link-active' : ''}`}
                >
                {link.label}
                </Link>
            </div>
            );
        })}
        </div>

        {/* User Icon with Login Dropdown Logic */}
        <div className="relative flex items-center" ref={dropdownRef}>
        <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white text-[40px] leading-none flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
            aria-label="Toggle user profile menu"
        >
            <i className="fa-solid fa-circle-user"></i>
        </button>

        {/* Reveal Login Link when icon is clicked */}
        {isDropdownOpen && (
            <div className="absolute right-0 top-[100%] mt-ratio-sm w-[200px] bg-white border border-[#dbdbdb] rounded-xl shadow-xl z-50 overflow-hidden">
            <Link 
                to="/login" 
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-left font-display font-bold text-[23px] text-[#4e0000] hover:bg-gray-50 transition-colors"
            >
                <span>Login</span>
                <span className="text-gray-400 text-sm">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </span>
            </Link>
            </div>
        )}
        </div>
    </div>

    </nav>
);
};

export default Navbar;