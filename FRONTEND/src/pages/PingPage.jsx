import React, { useState, useRef, useEffect } from 'react';
import { usePingLogic } from '../features/ping/usePingLogic';
import { cn } from '../utils/cn';

const PingPage = () => {
    const { 
        currentTab, 
        setCurrentTab, 
        locations, 
        filteredVehicles,
        register, 
        handleSubmit, 
        setValue,
        errors, 
        isSubmitting, 
        noteCount 
    } = usePingLogic();

    // Custom Dropdown States
    const [isVehicleOpen, setIsVehicleOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState("Select a Vehicle Unit");
    const [selectedLocation, setSelectedLocation] = useState("Select your current stop...");
    
    const vehicleRef = useRef(null);
    const locationRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (vehicleRef.current && !vehicleRef.current.contains(event.target)) setIsVehicleOpen(false);
            if (locationRef.current && !locationRef.current.contains(event.target)) setIsLocationOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset selections when tab changes
    useEffect(() => {
        setSelectedVehicle("Select a Vehicle Unit");
        setSelectedLocation("Select your current stop...");
        setValue('vehicle_id', '');
        setValue('location_id', '');
    }, [currentTab, setValue]);

    return (
        <main className="orbit-container pt-12 flex flex-col items-start gap-10 select-none pb-20">
            <h1 className="orbit-h1">Ping Now</h1>

            {/* Tab Switcher */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl border border-[#dbdbdb]">
                {['ikot', 'toda'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={cn(
                            "px-8 py-2.5 rounded-xl font-bold text-[16px] transition-all capitalize",
                            currentTab === tab ? "bg-[#840000] text-white shadow-sm" : "text-[#666666] hover:bg-gray-200"
                        )}
                    >
                        {tab} Units
                    </button>
                ))}
            </div>

            <div className="orbit-card w-full mb-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    <div className="flex flex-col gap-8">
                        {/* CUSTOM VEHICLE SELECTOR */}
                        <div className="flex flex-col gap-3 relative" ref={vehicleRef}>
                            <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Unit</label>
                            <div 
                                onClick={() => setIsVehicleOpen(!isVehicleOpen)}
                                className={cn(
                                    "orbit-input flex items-center justify-between cursor-pointer",
                                    errors.vehicle_id ? "border-red-500" : "border-[#dbdbdb]"
                                )}
                            >
                                <span className={selectedVehicle.includes("Select") ? "text-gray-400" : "text-[#1e1e1e] font-medium"}>
                                    {selectedVehicle}
                                </span>
                                <i className={cn("fa-solid fa-chevron-down text-[#840000] transition-transform", isVehicleOpen && "rotate-180")}></i>
                            </div>
                            {isVehicleOpen && (
                                <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-2xl z-50 shadow-2xl overflow-hidden animate-in">
                                    <div className="max-h-[250px] overflow-y-auto no-scrollbar">
                                        {filteredVehicles.length > 0 ? filteredVehicles.map((v) => (
                                            <div key={v.vehicle_id} onClick={() => {
                                                setSelectedVehicle(`${v.plate_number} (${v.body_number})`); 
                                                setValue('vehicle_id', v.vehicle_id.toString()); 
                                                setIsVehicleOpen(false); 
                                            }} className="px-6 py-4 hover:bg-[#840000] hover:text-white cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0">
                                                <p className="font-bold">{v.plate_number}</p>
                                                <p className="text-xs opacity-80">Body #: {v.body_number}</p>
                                            </div>
                                        )) : <div className="px-6 py-8 text-center text-gray-400 italic text-sm">No units found</div>}
                                    </div>
                                </div>
                            )}
                            {errors.vehicle_id && <p className="text-red-600 text-xs font-bold ml-1">{errors.vehicle_id.message}</p>}
                        </div>

                        {/* BRANDED CUSTOM LOCATION SELECTOR */}
                        <div className="flex flex-col gap-3 relative" ref={locationRef}>
                            <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Location</label>
                            <div 
                                onClick={() => setIsLocationOpen(!isLocationOpen)}
                                className={cn(
                                    "orbit-input flex items-center justify-between cursor-pointer",
                                    errors.location_id ? "border-red-500" : "border-[#dbdbdb]"
                                )}
                            >
                                <span className={selectedLocation.includes("Select") ? "text-gray-400" : "text-[#1e1e1e] font-medium"}>
                                    {selectedLocation}
                                </span>
                                <i className={cn("fa-solid fa-chevron-down text-[#840000] transition-transform", isLocationOpen && "rotate-180")}></i>
                            </div>
                            {isLocationOpen && (
                                <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-2xl z-50 shadow-2xl overflow-hidden animate-in">
                                    <div className="max-h-[250px] overflow-y-auto no-scrollbar">
                                        {locations.map((loc) => (
                                            <div key={loc.location_id} onClick={() => {
                                                setSelectedLocation(loc.location_name); 
                                                setValue('location_id', loc.location_id.toString()); 
                                                setIsLocationOpen(false); 
                                            }} className="px-6 py-4 hover:bg-[#840000] hover:text-white cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0">
                                                <p className="font-bold">{loc.location_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {errors.location_id && <p className="text-red-600 text-xs font-bold ml-1">{errors.location_id.message}</p>}
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest ml-1 flex justify-between">
                            Notes <span className={cn("text-[12px]", noteCount > 180 ? "text-red-500" : "text-gray-300")}>{noteCount}/200</span>
                        </label>
                        <textarea 
                            {...register('note')} 
                            className="w-full flex-grow min-h-[160px] p-6 rounded-2xl border-2 border-[#dbdbdb] resize-none focus:border-[#840000] outline-none text-sm transition-all" 
                            placeholder="Is the unit full? Let others know!"
                        />
                        {errors.note && <p className="text-red-600 text-xs font-bold ml-1">{errors.note.message}</p>}
                    </div>

                    {/* Branded Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={cn(
                            "lg:col-span-2 w-full orbit-btn-maroon !h-14 !text-[18px]",
                            isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isSubmitting ? "Transmitting..." : "Submit Ping"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default PingPage;