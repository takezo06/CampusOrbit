import React, { useState, useRef, useEffect } from 'react';
import { usePingLogic } from '../features/ping/usePingLogic'; // Corrected path
import { cn } from '../utils/cn';

const PingPage = () => {
const { 
    currentTab, setCurrentTab, guestName, 
    register, handleSubmit, onSubmit, 
    errors, isSubmitting, noteCount 
} = usePingLogic();

// State for Custom Aesthetic Dropdowns
const [isVehicleOpen, setIsVehicleOpen] = useState(false);
const [selectedVehicle, setSelectedVehicle] = useState("Select a Vehicle Unit");
const vehicleRef = useRef(null);

// Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event) => {
    if (vehicleRef.current && !vehicleRef.current.contains(event.target)) {
        setIsVehicleOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const vehicleOptions = [
    { id: "VFK307", label: "VFK307 (Ikot)" },
    { id: "GAP670", label: "GAP670 (Ikot)" },
];

return (
    <main className="w-full max-w-[1440px] px-[170px] pt-16 flex flex-col items-start gap-12 mx-auto content-wrapper select-none">
    <div className="flex justify-between items-end w-full">
        <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">
        Ping Now
        </h1>
        <div className="flex flex-col items-end gap-2 mb-4">
        <span className="font-body text-[#757373] text-[18px]">Posting as:</span>
        <span className="font-mono font-bold text-[#840000] text-[24px] bg-[#84000010] px-4 py-1 rounded-lg border border-[#84000020]">
            {guestName}
        </span>
        </div>
    </div>

    <div className="w-full bg-white border border-[#dbdbdb] rounded-[35px] p-16 shadow-[0_10px_80px_rgba(132,0,0,0.08)] overflow-visible">
        
        {/* Toggle */}
        <div className="mb-14 flex justify-start">
        <div className="orbit-toggle-container" onClick={() => setCurrentTab(currentTab === 'ikot' ? 'toda' : 'ikot')}>
            <div className={cn("orbit-toggle-slider", currentTab === 'ikot' ? "translate-x-0 bg-[#840000]" : "translate-x-[calc(100%+4px)] bg-[#003a00]")} />
            <span className={cn("toggle-text", currentTab === 'ikot' ? "text-white" : "text-[#999999]")}>UP IKOT</span>
            <span className={cn("toggle-text", currentTab === 'toda' ? "text-white" : "text-[#999999]")}>UP TODA</span>
        </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-10">
            
            {/* AESTHETIC CUSTOM DROPDOWN */}
            <div className="flex flex-col gap-4 relative" ref={vehicleRef}>
            <label className="font-body font-bold text-[22px] text-[#1e1e1e] ml-4">Vehicle Unit</label>
            
            <div 
                onClick={() => setIsVehicleOpen(!isVehicleOpen)}
                className={cn(
                "relative w-full h-[80px] px-8 rounded-[25px] border-2 flex items-center justify-between cursor-pointer transition-all",
                isVehicleOpen ? "border-[#840000] shadow-[0_0_15px_rgba(132,0,0,0.1)]" : "border-[#dbdbdb]"
                )}
            >
                <span className={cn("font-body text-[20px]", selectedVehicle.includes("Select") ? "text-[#999999]" : "text-[#1e1e1e]")}>
                {selectedVehicle}
                </span>
                <i className={cn("fa-solid fa-chevron-down text-xl text-[#757373] transition-transform", isVehicleOpen && "rotate-180 text-[#840000]")}></i>

                {/* The Floating Menu */}
                {isVehicleOpen && (
                <div className="absolute top-[90px] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-[25px] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    {vehicleOptions.map((option) => (
                    <div 
                        key={option.id}
                        onClick={() => {
                        setSelectedVehicle(option.label);
                        setIsVehicleOpen(false);
                        }}
                        className="px-8 py-5 font-body text-[19px] text-[#1e1e1e] hover:bg-[#840000] hover:text-white transition-colors cursor-pointer"
                    >
                        {option.label}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>

            {/* Current Location - Same logic can be applied here */}
            <div className="flex flex-col gap-4 relative">
            <label className="font-body font-bold text-[22px] text-[#1e1e1e] ml-4">Current Location</label>
            <div className="w-full h-[80px] px-8 rounded-[25px] border-2 border-[#dbdbdb] flex items-center justify-between">
                <span className="font-body text-[20px] text-[#999999]">Where are you now?</span>
                <i className="fa-solid fa-chevron-down text-xl text-[#757373]"></i>
            </div>
            </div>
        </div>

        {/* Right Column: Note Textarea */}
        <div className="flex flex-col gap-4">
            <label className="font-body font-bold text-[22px] text-[#1e1e1e] flex justify-between ml-4">
            Notes (Optional)
            <span className="text-[16px] font-mono text-[#999999]">{noteCount}/200</span>
            </label>
            <textarea 
            {...register('note')}
            placeholder="e.g., Almost full, only 2 seats left!"
            className="flex-grow min-h-[220px] p-10 rounded-[30px] border-2 border-[#dbdbdb] font-body text-[20px] outline-none transition-all focus:border-[#840000] resize-none"
            />
        </div>

        <div className="lg:col-span-2 mt-4">
            <button
            type="submit"
            className={cn(
                "w-full h-[85px] rounded-full font-display font-bold text-[32px] text-white shadow-xl transition-all active:scale-[0.98]",
                currentTab === 'ikot' ? "bg-[#4e0000] hover:bg-[#840000]" : "bg-[#003a00] hover:bg-[#005a00]"
            )}
            >
            Submit Ping
            </button>
        </div>
        </form>
    </div>
    </main>
);
};

export default PingPage;