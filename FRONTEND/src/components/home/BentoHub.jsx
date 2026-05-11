import React from 'react';
import { Link } from 'react-router-dom';

const BentoHub = ({ latestPings = [] }) => {
  return (
    <section className="w-full flex flex-col items-center py-24 bg-[#fcfcfc]">
      {/* Header Area */}
      <div className="w-full max-w-[1440px] px-[170px] mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-display font-bold text-[48px] text-maroon-dark leading-tight">Campus Hub</h2>
          <p className="bento-subtitle text-lg mb-0">Your central command for UPMin transit.</p>
        </div>
      </div>

      <div className="orbit-bento-grid">
        
        {/* TOP LEFT: LIVE FEED (8 cols) */}
        <div className="bento-card col-span-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="bento-title">Live Unit Feed</h3>
              <p className="bento-subtitle">Most recent sightings from the community.</p>
            </div>
            <Link to="/units" className="text-maroon-main font-bold text-sm hover:underline">View All</Link>
          </div>
          
          <div className="unit-track">
            {latestPings.slice(0, 5).map((ping, idx) => (
              <div key={idx} className="unit-mini-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-maroon-main text-lg">{ping.id}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="font-bold text-text-main truncate">{ping.lastLandmark}</span>
                <span className="text-[11px] text-text-muted uppercase font-mono">{ping.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* VERTICAL ANCHOR: DASHBOARD (4 cols) */}
        <div className="bento-card col-span-4 row-span-2">
          <div className="flex justify-between items-center mb-8">
            <h3 className="bento-title mb-0">Dashboard</h3>
            <span className="text-xs font-bold px-3 py-1 bg-maroon-main/10 text-maroon-main rounded-full">Level 12</span>
          </div>
          
          <div className="flex-grow space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-400"><span>XP PROGRESS</span><span>80%</span></div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-maroon-main h-full w-[80%]" />
              </div>
            </div>
            
            <div className="bento-stat-pill bg-maroon-dark">
              <i className="fa-solid fa-satellite-dish"></i>
              <div className="flex flex-col"><span className="text-2xl leading-none">48</span><span className="text-[10px] opacity-70">PINGS</span></div>
            </div>
            
            <div className="bento-stat-pill bg-green-main">
              <i className="fa-solid fa-calendar-check"></i>
              <div className="flex flex-col"><span className="text-2xl leading-none">May 2026</span><span className="text-[10px] opacity-70">JOINED</span></div>
            </div>
          </div>

          <Link to="/dashboard" className="ping-submit w-full mt-8 flex items-center justify-center">Open Full Dashboard</Link>
        </div>

        {/* BOTTOM LEFT: QUICK PING (8 cols) */}
        <div className="bento-card col-span-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="bento-title">Quick Ping</h3>
              <p className="bento-subtitle">Signal a unit sighting without leaving this page.</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-maroon-main bg-maroon-main/5 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-maroon-main rounded-full animate-ping" />
              LIVE SYSTEM
            </div>
          </div>

          <div className="ping-form-container">
            <div className="ping-input-group">
              <label className="ping-label">Vehicle Unit</label>
              <select className="ping-select">
                <option>Select Unit...</option>
                <option>UP IKOT - VFK307</option>
                <option>UP TODA - GAP670</option>
              </select>
            </div>
            <div className="ping-input-group">
              <label className="ping-label">Landmark</label>
              <select className="ping-select">
                <option>Select Location...</option>
                <option>CSM Building</option>
                <option>Admin Building</option>
                <option>Mintal Gate</option>
              </select>
            </div>
            <button className="ping-submit">Ping Now</button>
          </div>
        </div>

        {/* SYSTEM FOOTER: Full Width Info (12 cols) */}
        <div className="col-span-12 mt-4 px-8 py-6 bg-maroon-main/5 rounded-[25px] flex justify-between items-center border border-maroon-main/10">
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-circle-info text-maroon-main"></i>
            <p className="text-sm text-maroon-dark font-medium">
              Crowdsourced data helps everyone. Pings are verified in real-time by the UPMin community.
            </p>
          </div>
          <Link to="/about" className="font-bold text-maroon-main text-sm hover:underline">How it works →</Link>
        </div>

      </div>
    </section>
  );
};

export default BentoHub;