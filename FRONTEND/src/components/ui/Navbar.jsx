import React, { useState, useRef, useEffect } from 'react';
// FIX: Ensure useLocation is imported
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; 
import api from '../../utils/api'; 
import orbitLogo from '../../assets/orbit.png';
import upminLogo from '../../assets/up.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const userRef = useRef(null);

  // 1. Create a reactive state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('orbit_token'));

  // 2. Re-check authentication whenever the URL changes
  useEffect(() => {
    const token = localStorage.getItem('orbit_token');
    setIsAuthenticated(!!token);

    if (token) {
      api.get('/auth/me')
        .then(res => setUserName(res.data.data.name))
        .catch(() => {
            // Clear invalid token
            localStorage.removeItem('orbit_token');
            setIsAuthenticated(false);
        });
    } else {
      setUserName(null);
    }
  }, [location.pathname]); // Re-verify on every page navigation

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); //
    } catch (err) {
      console.error("Logout failed on server.");
    } finally {
      // Clear all potential keys to be safe
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user_role');
      
      // Update local state immediately
      setIsAuthenticated(false);
      setUserName(null);
      setIsUserOpen(false);
      
      navigate('/');
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Units", path: "/units" },
    { label: "Ping Now", path: "/ping" },
    { label: "About", path: "/about" },
    { label: "Dashboard", path: "/dashboard" }
  ];

  return (
    <nav className="flex items-center justify-between py-4 px-12 bg-[#840000] text-white shadow-lg sticky top-0 z-[1000]">
      <div className="flex items-center gap-4">
        <NavLink to="/"><img src={orbitLogo} alt="Orbit" className="h-[40px] object-contain" /></NavLink>
        <div className="w-[1px] h-6 bg-white/20" /> 
        <img src={upminLogo} alt="UPMin" className="h-8 object-contain" />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `px-4 py-1.5 text-[16px] text-white transition-all rounded-md font-medium ${
                  isActive ? "bg-white !text-[#4e0000] font-bold shadow-sm" : "hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        
        <div className="relative" ref={userRef}>
          <div 
            onClick={() => setIsUserOpen(!isUserOpen)}
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              isUserOpen ? "bg-white text-[#840000]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <i className="fa-solid fa-user"></i>
          </div>

          {isUserOpen && (
            <div className="absolute top-[50px] right-0 w-[220px] bg-white rounded-xl shadow-2xl py-3 flex flex-col border border-gray-100 z-[100]">
              {isAuthenticated ? (
                <>
                  <div className="px-5 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Logged in as</p>
                    <p className="text-[#4e0000] font-bold truncate text-base">{userName || "User Account"}</p>
                  </div>
                  <button 
                    onClick={() => { navigate('/dashboard'); setIsUserOpen(false); }}
                    className="w-full px-5 py-2 text-left text-[14px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-gauge text-xs"></i> My Dashboard
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-5 py-2 text-left text-[14px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-right-from-bracket text-xs"></i> Log Out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { navigate('/login'); setIsUserOpen(false); }}
                    className="w-full px-5 py-2 text-left text-[14px] font-bold text-[#840000] hover:bg-gray-50 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-right-to-bracket text-xs"></i> Login
                  </button>
                  <button 
                    onClick={() => { navigate('/signup'); setIsUserOpen(false); }}
                    className="w-full px-5 py-2 text-left text-[14px] font-medium text-[#757373] hover:bg-gray-50 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-user-plus text-xs"></i> Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;