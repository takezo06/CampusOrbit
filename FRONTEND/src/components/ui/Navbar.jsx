import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import orbitLogo from '../../assets/orbit.png';
import upminLogo from '../../assets/up.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const userRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Units", path: "/units" },
    { label: "Ping Now", path: "/ping" }, // Path synchronized with App.jsx
    { label: "About", path: "/about" },
    { label: "Dashboard", path: "/dashboard" }
  ];

  return (
    <nav className="orbit-nav">
      {/* Branding */}
      <div className="flex items-center gap-5">
        <NavLink to="/">
          <img src={orbitLogo} alt="Orbit" className="h-[55px] object-contain" />
        </NavLink>
        <div className="w-[1px] h-8 bg-white/20" /> 
        <img src={upminLogo} alt="UPMin" className="h-12 object-contain" />
      </div>

      {/* Navigation & User Actions */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `px-6 py-2 text-[20px] text-white transition-all rounded-lg font-medium ${
                  isActive ? "bg-white !text-[#4e0000] font-bold shadow-md" : "hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        
        {/* User Icon with Pop-out Login */}
        <div className="relative" ref={userRef}>
          <div 
            onClick={() => setIsUserOpen(!isUserOpen)}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              isUserOpen ? "bg-white text-[#840000]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <i className="fa-solid fa-user text-xl"></i>
          </div>

          {/* User Dropdown Menu */}
          {isUserOpen && (
            <div className="absolute top-[60px] right-0 w-[200px] bg-white rounded-2xl shadow-2xl py-4 flex flex-col border border-gray-100 animate-in overflow-hidden z-[100]">
              <button 
                onClick={() => { navigate('/login'); setIsUserOpen(false); }}
                className="w-full px-6 py-3 text-left font-body font-bold text-[#840000] hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </button>
              <button 
                onClick={() => { navigate('/signup'); setIsUserOpen(false); }}
                className="w-full px-6 py-3 text-left font-body font-medium text-[#757373] hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <i className="fa-solid fa-user-plus"></i>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;