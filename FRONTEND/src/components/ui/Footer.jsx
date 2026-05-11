import React from 'react';
import { Link } from 'react-router-dom';
import orbitWhiteBg from '../../assets/orbitWhitebg.png';
import upminLogo from '../../assets/up.png';

const Footer = () => {
  return (
    <footer className="orbit-footer">
      <div className="w-full max-w-[1440px] px-[170px] flex flex-col gap-16">
        
        <div className="w-full flex justify-between items-start">
          {/* Logo Cluster */}
          <div className="flex items-center gap-6">
            <img src={orbitWhiteBg} alt="Orbit" className="h-[100px] object-contain" />
            <img src={upminLogo} alt="UPMin" className="h-[80px] object-contain" />
          </div>

          {/* Links Grid */}
          <div className="flex gap-24 pt-4">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold uppercase tracking-tighter mb-2 text-sm">Platform</h4>
              <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
              <Link to="/units" className="text-white/60 hover:text-white transition-colors">Units</Link>
              <Link to="/ping" className="text-white/60 hover:text-white transition-colors">Ping Now</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold uppercase tracking-tighter mb-2 text-sm">Information</h4>
              <Link to="/about" className="text-white/60 hover:text-white transition-colors">About</Link>
              <Link to="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/login" className="text-white/60 hover:text-white transition-colors">Login</Link>
            </div>
          </div>

          {/* Socials & Info */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-white font-bold uppercase tracking-tighter text-sm">Find us at:</h4>
            <div className="flex gap-3">
              {[ "facebook-f", "x-twitter", "instagram", "linkedin-in" ].map(icon => (
                <div key={icon} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#4e0000] cursor-pointer transition-all">
                  <i className={`fa-brands fa-${icon}`}></i>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[12px] leading-relaxed max-w-[240px] mt-2">
              Providing modern, real-time transit tracking for the UP Mindanao community.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 pt-8 flex justify-between text-white/30 text-[13px]">
          <p>© 2026 University of the Philippines Mindanao. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;