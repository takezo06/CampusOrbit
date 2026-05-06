import React, { useState, useRef, useEffect } from 'react';
import { useAboutLogic } from '../features/about/useAboutLogic';
import orbitLogo from '../assets/orbit.png'; 
import upminLogo from '../assets/up.png'; 

const AboutPage = () => {
const { navLinks, mainDescription, teamMembers } = useAboutLogic();
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

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
    <div className="w-full min-h-screen bg-white text-[#1e1e1e] font-body flex flex-col items-center select-none overflow-x-hidden">
    
    {/* NAVBAR */}
    <nav className="orbit-nav">
        <div className="orbit-logo-track">
        <img src={orbitLogo} alt="Campus Orbit Logo" className="w-[160px] h-[72px] object-contain" />
        <img src={upminLogo} alt="UP Mindanao Crest" className="w-[58.5px] h-[47.6px] object-contain" />
        </div>

        <div className="orbit-action-track">
        <div className="hidden md:flex items-center gap-ratio-sm">
            {navLinks.map((link, idx) => (
            <div key={idx} className="orbit-nav-item-container">
                <a href={link.path} className={`orbit-nav-link ${link.isActive ? 'orbit-nav-link-active' : ''}`}>
                {link.label}
                </a>
            </div>
            ))}
        </div>

        <div className="relative flex items-center" ref={dropdownRef}>
            <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white text-[40px] leading-none flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
            >
            <i className="fa-solid fa-circle-user"></i>
            </button>

            {isDropdownOpen && (
            <div className="absolute right-0 top-[100%] mt-ratio-sm w-[200px] bg-white border border-[#dbdbdb] rounded-xl shadow-xl z-50 overflow-hidden">
                <a href="/login" className="flex items-center justify-between px-6 py-4 text-left font-display font-bold text-[23px] text-[#4e0000] hover:bg-gray-50 transition-colors">
                <span>Login</span>
                <i className="fa-solid fa-arrow-right-to-bracket text-gray-400 text-sm"></i>
                </a>
            </div>
            )}
        </div>
        </div>
    </nav>

    {/* ABOUT TEXT ROW */}
    <main className="w-full max-w-[1440px] px-[68px] pt-16 flex flex-col items-center gap-12">
        <div className="text-center">
        <h1 className="font-body font-bold text-[86px] text-text tracking-tight mb-8">
            About Us
        </h1>
        <p className="max-w-[1060px] text-[24px] font-body text-[#757373] font-normal leading-[1.4] text-center whitespace-pre-line">
            {mainDescription}
        </p>
        </div>

        {/* MEET THE TEAM LAYOUT SECTION */}
        <section className="w-full flex flex-col items-center gap-16 mt-12 mb-16">
        <h2 className="font-body font-bold text-[86px] text-text tracking-tight text-center">
            Meet the Team
        </h2>

        <div className="w-full flex flex-col gap-12 items-center max-w-[1151px]">
            {teamMembers.map((member, idx) => (
            <article 
                key={idx}
                className="w-full max-w-[1151px] bg-[#ffffff1a] rounded-[27px] border border-[#dbdbdb] p-12 flex flex-col md:flex-row items-center gap-10 shadow-[0_4px_60px_10px_rgba(132,0,0,0.4)] transition-all duration-300"
            >
                <div className="text-black text-[250px] leading-none shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-circle-user"></i>
                </div>

                <div className="flex flex-col flex-grow text-left justify-center">
                <span className="font-body font-bold text-[26px] text-[#1e1e1e] uppercase tracking-wide mb-1">
                    Hello! I am
                </span>
                <h3 className="font-body font-bold text-[#840000] leading-none tracking-tight mb-4" style={{ fontSize: member.nameSize || '95px' }}>
                    {member.name}
                </h3>
                <p className="font-body font-normal text-[24px] text-[#757373] leading-[1.4] whitespace-pre-line">
                    {member.bio}
                </p>
                </div>
            </article>
            ))}
        </div>
        </section>
    </main>

    </div>
);
};

export default AboutPage;