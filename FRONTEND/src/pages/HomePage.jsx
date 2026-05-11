import React from 'react';
import { Link } from 'react-router-dom';
import { useHomeLogic } from '../features/home/useHomeLogic';
import heroBackdrop from '../assets/hero.png';
import BentoHub from '../components/home/BentoHub';

const HomePage = () => {
    const { stats, features, allLatestPings, userData, loading } = useHomeLogic();

    return (
        <div className="w-full flex flex-col items-center select-none bg-white font-body">
            <section className="orbit-hero" style={{ backgroundImage: `url(${heroBackdrop})` }}>
                <div className="orbit-hero-blur-layer" />
                <div className="orbit-hero-gradient-mask" />
                <div className="relative z-10 flex flex-col items-center text-center max-w-[1108px] gap-8">
                    <h1 className="orbit-hero-title">Modern Transit for <br /> UPMin Campus</h1>
                    <p className="orbit-hero-description text-[24px]">Bringing campus transit into your orbit.</p>
                    <div className="flex items-center gap-10 mt-4">
                        <Link to="/units" className="btn-glass btn-glass-maroon">View Units</Link>
                        <Link to="/ping" className="btn-glass btn-glass-green">Ping Now</Link>
                    </div>
                </div>
            </section>

            {/* PASSING USERDATA TO BENTO */}
            <BentoHub latestPings={allLatestPings} userData={userData} />

            <section className="w-full max-w-[1440px] px-[170px] py-12 grid grid-cols-4 gap-8">
                {stats?.map((stat, idx) => (
                    <div key={idx} className="text-center p-8 bg-gray-50 rounded-[25px] border border-gray-100">
                        <div className="text-[42px] font-black text-[#840000]">{stat.value}</div>
                        <div className="text-sm font-bold text-gray-500 uppercase whitespace-pre-line">{stat.label}</div>
                    </div>
                ))}
            </section>

            <section className="w-full max-w-[1440px] px-[170px] py-24 flex flex-col items-center mb-32">
                <h2 className="orbit-h1">Why Choose Orbit?</h2>
                <div className="feature-matrix-grid">
                    {features?.map((feat, idx) => (
                        <article key={idx} className="feature-card group">
                            <div className="feature-icon-badge group-hover:bg-[#840000] transition-colors">
                                <i className={`fa-solid ${feat.iconClass} group-hover:text-white text-[#840000] text-2xl`}></i>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="feature-title">{feat.title}</h3>
                                <p className="text-[#757373] leading-relaxed">{feat.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;