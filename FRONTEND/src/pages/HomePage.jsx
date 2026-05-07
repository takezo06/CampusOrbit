import React, { useState, useRef, useEffect } from 'react';
import { useHomeLogic } from '../features/home/useHomeLogic';
import heroBackdrop from '../assets/hero.png';
import orbitLogo from '../assets/orbit.png'; 
import upminLogo from '../assets/up.png'; 

const HomePage = () => {
const { navLinks, stats, features } = useHomeLogic();
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
    <div className="w-full min-h-screen flex flex-col items-center select-none bg-white text-[#1e1e1e]">

    {/* HERO SECTION */}
    <section className="orbit-hero" style={{ backgroundImage: `url(${heroBackdrop})` }}>
        <div className="orbit-hero-blur-layer" />
        <div className="orbit-hero-gradient-mask" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-[1108px] gap-ratio-md">
        <div className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <h1 className="orbit-hero-title">
            Modern Transit for <br />
            <span className="text-maroon-soft">UPMin Campus</span>
            </h1>
        </div>

        <p className="orbit-hero-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id.
        </p>

        <div className="flex items-center gap-ratio-md mt-4">
            <button className="btn-hero-base btn-hero-green">View Locations</button>
            <button className="btn-hero-base btn-hero-maroon">Ping Now</button>
        </div>
        </div>
    </section>

    {/* METRICS ROW */}
    <section className="metrics-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center items-start">
        {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center px-4">
            <span className="metric-value">{stat.value}</span>
            <span className="metric-label">{stat.label}</span>
            </div>
        ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>

    {/* WHY CHOOSE ORBIT GRID */}
    <section className="w-full max-w-[1150px] py-ratio-xl px-4 flex flex-col items-center">
        <h2 className="font-body font-bold text-[86px] text-text tracking-tight text-center mb-ratio-lg">
        Why Choose Orbit?
        </h2>

        <div className="feature-matrix-grid">
        {features.map((feat, idx) => (
            <article key={idx} className="feature-card">
            <div className="feature-icon-badge">
                <i className={`fa-solid ${feat.iconClass}`}></i>
            </div>
            <div className="flex flex-col gap-2 text-left">
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-description">{feat.description}</p>
            </div>
            </article>
        ))}
        </div>
    </section>

    </div>
);
};

export default HomePage;