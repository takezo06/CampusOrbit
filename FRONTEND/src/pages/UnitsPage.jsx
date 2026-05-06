import React, { useState, useRef, useEffect } from 'react';
import { useUnitsLogic } from '../features/units/useUnitsLogic';
import orbitLogo from '../assets/orbit.png'; 
import upminLogo from '../assets/up.png'; 

const UnitsPage = () => {
const { 
    navLinks, 
    currentUnitTab, 
    setCurrentUnitTab, 
    transportationUnits,
    selectedVehicleTrack,
    setSelectedVehicleTrack
} = useUnitsLogic();

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
    <div className="w-full min-h-screen bg-white text-[#1e1e1e] font-body flex flex-col items-center select-none overflow-x-hidden relative">
    
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

    {/* OVERVIEW DASHBOARD PANEL */}
    <main className="w-full max-w-[1440px] px-[68px] pt-16 flex flex-col items-start gap-12">
        <h1 className="font-body font-bold text-[86px] text-text tracking-tight leading-none">
        Transportation Units
        </h1>

        <div className="w-full bg-[#ffffff1a] border border-[#dbdbdb] rounded-[27px] p-8 shadow-[0_4px_15.2px_9px_rgba(0,0,0,0.03)] flex flex-col gap-8">
        
        {/* TAB SYSTEM TOGGLES */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-4">
            <button 
            onClick={() => setCurrentUnitTab('jeep')}
            className={`font-body font-bold text-[28px] pb-2 transition-all relative ${
                currentUnitTab === 'jeep' ? 'text-[#840000]' : 'text-gray-400 hover:text-gray-600'
            }`}
            >
            Jeeps
            {currentUnitTab === 'jeep' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#840000] rounded-full" />}
            </button>
            <button 
            onClick={() => setCurrentUnitTab('tricycle')}
            className={`font-body font-bold text-[28px] pb-2 transition-all relative ${
                currentUnitTab === 'tricycle' ? 'text-[#840000]' : 'text-gray-400 hover:text-gray-600'
            }`}
            >
            Tricycles
            {currentUnitTab === 'tricycle' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#840000] rounded-full" />}
            </button>
        </div>

        {/* VEHICLE MANAGEMENT TABLE OVERVIEW */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full border-collapse text-left bg-white">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-5 font-body font-bold text-[18px] text-gray-700">Unit ID</th>
                <th className="p-5 font-body font-bold text-[18px] text-gray-700">Driver / Operator</th>
                <th className="p-5 font-body font-bold text-[18px] text-gray-700">Last Ping Landmark</th>
                <th className="p-5 font-body font-bold text-[18px] text-gray-700">Timestamp</th>
                <th className="p-5 font-body font-bold text-[18px] text-gray-700">Status</th>
                <th className="p-5 font-body font-bold text-[18px] text-gray-700 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {transportationUnits[currentUnitTab].map((unit, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-5 font-body font-bold text-[20px] text-[#840000]">{unit.id}</td>
                    <td className="p-5 font-body font-normal text-[18px] text-text">{unit.driver}</td>
                    <td className="p-5 font-body font-normal text-[18px] text-text flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#bd0303]" />
                    {unit.lastLandmark}
                    </td>
                    <td className="p-5 font-body font-normal text-[16px] text-[#757373]">{unit.timestamp}</td>
                    <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full font-body font-bold text-[14px] uppercase tracking-wide border ${
                        unit.status === 'Active' 
                        ? 'bg-green-50 text-[#003a00] border-green-200' 
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                        {unit.status}
                    </span>
                    </td>
                    {/* MORE INFO INTERACTIVE TRIGGER */}
                    <td className="p-5 text-center">
                    <button
                        onClick={() => setSelectedVehicleTrack(unit)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4e0000] to-[#840000] text-white font-body font-bold text-[15px] shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                        More Info
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </main>

    {/* INTERACTIVE TIMELINE DRAWER OVERLAY MODAL */}
    {selectedVehicleTrack && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
        {/* Backdrop Click Dismiss anchor */}
        <div className="absolute inset-0" onClick={() => setSelectedVehicleTrack(null)} />
        
        {/* Timeline Tracking Card Panel */}
        <div className="relative w-full max-w-[490px] h-full bg-white shadow-2xl p-8 flex flex-col justify-start animate-fade-in-left overflow-y-auto">
            
            {/* Header / Dismiss Action Block */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="font-body font-bold text-[36px] text-[#840000] tracking-tight">
                {selectedVehicleTrack.id}
            </h2>
            <button 
                onClick={() => setSelectedVehicleTrack(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl p-2 cursor-pointer focus:outline-none"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            </div>

            {/* Micro Details Component Meta Data strip */}
            <div className="mb-6 bg-gray-50 rounded-xl p-4 flex flex-col gap-1 border border-gray-100">
            <div className="text-[15px] font-body text-gray-500">
                <span className="font-bold text-gray-700">Driver:</span> {selectedVehicleTrack.driver}
            </div>
            <div className="text-[15px] font-body text-gray-500">
                <span className="font-bold text-gray-700">Current Status:</span> {selectedVehicleTrack.status}
            </div>
            </div>

            {/* TIMELINE COMPONENT BLOCK GRAPHIC */}
            <div className="w-full bg-[#f8f9fa] rounded-[22px] border border-[#dbdbdb]/60 p-6 flex flex-col">
            {selectedVehicleTrack.routeHistory.map((stop, sIdx) => (
                <div key={sIdx} className="flex items-start relative pb-8 last:pb-0">
                
                {/* Vertical Dotted Path Track Line Segment */}
                {sIdx !== selectedVehicleTrack.routeHistory.length - 1 && (
                    <div className="absolute left-[11px] top-[26px] bottom-0 w-[1px] border-l border-dashed border-[#757373]" />
                )}

                {/* Circular Order Metric Node Token */}
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center text-[13px] font-display shrink-0 mr-4 border mt-0.5 transition-all ${
                    sIdx === 0 
                    ? 'bg-[#003a00] text-white border-transparent font-bold' 
                    : 'bg-transparent text-[#757373] border-[#757373]'
                }`}>
                    {sIdx + 1}
                </div>

                {/* Track Stop Descriptions Segment block */}
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col text-left">
                    <span className={`font-display text-[17px] leading-tight ${sIdx === 0 ? 'text-[#1e1e1e] font-bold' : 'text-gray-800'}`}>
                        {stop.landmark}
                    </span>
                    <span className="font-display text-[13px] text-[#999999] mt-0.5">
                        {stop.building}
                    </span>
                    </div>
                    
                    <span className={`font-display text-[15px] shrink-0 ml-4 ${sIdx === 0 ? 'text-[#003a00] font-bold' : 'text-[#999999]'}`}>
                    {stop.time}
                    </span>
                </div>

                </div>
            ))}
            </div>

        </div>
        </div>
    )}

    </div>
);
};

export default UnitsPage;