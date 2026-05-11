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

    // Reset vehicle selection when tab changes
    useEffect(() => {
        setSelectedVehicle("Select a Vehicle Unit");
        setValue('vehicle_id', '');
    }, [currentTab, setValue]);

    return (
        <main className="w-full max-w-[1440px] px-[170px] pt-16 flex flex-col items-start gap-12 mx-auto select-none">
            <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">
                Ping Now
            </h1>

            {/* Tab Switcher */}
            <div className="flex gap-4 p-2 bg-[#f5f5f5] rounded-[25px] border border-[#dbdbdb]">
                {['ikot', 'toda'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={cn(
                            "px-10 py-3 rounded-[20px] font-bold text-[20px] transition-all capitalize",
                            currentTab === tab 
                                ? "bg-[#840000] text-white shadow-md" 
                                : "text-[#666666] hover:bg-[#ebe0e0]"
                        )}
                    >
                        {tab} Units
                    </button>
                ))}
            </div>

            <div className="w-full bg-white border border-[#dbdbdb] rounded-[35px] p-16 shadow-lg mb-20">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    <div className="flex flex-col gap-10">
                        {/* Custom Vehicle Dropdown */}
                        <div className="flex flex-col gap-4 relative" ref={vehicleRef}>
                            <label className="font-bold text-[22px] ml-4 text-[#1e1e1e]">
                                Vehicle Unit
                            </label>
                            <div 
                                onClick={() => setIsVehicleOpen(!isVehicleOpen)}
                                className={cn(
                                    "w-full h-[80px] px-8 rounded-[25px] border-2 flex items-center justify-between cursor-pointer transition-all bg-white",
                                    errors.vehicle_id ? "border-red-500" : "border-[#dbdbdb] hover:border-[#840000]"
                                )}
                            >
                                <span className={selectedVehicle.includes("Select") ? "text-[#999999]" : "text-[#1e1e1e] font-medium text-[20px]"}>
                                    {selectedVehicle}
                                </span>
                                <svg 
                                    className={cn("w-6 h-6 transition-transform", isVehicleOpen && "rotate-180")} 
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>

                                {isVehicleOpen && (
                                    <div className="absolute top-[90px] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-[25px] z-50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {filteredVehicles.length > 0 ? (
                                                filteredVehicles.map((v) => (
                                                    <div 
                                                        key={v.vehicle_id} 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedVehicle(`${v.plate_number} (${v.body_number})`); 
                                                            setValue('vehicle_id', v.vehicle_id.toString()); 
                                                            setIsVehicleOpen(false); 
                                                        }} 
                                                        className="px-8 py-5 hover:bg-[#840000] hover:text-white cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0"
                                                    >
                                                        <p className="font-bold">{v.plate_number}</p>
                                                        <p className="text-sm opacity-80">Body #: {v.body_number}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-8 py-10 text-center text-gray-400 italic">
                                                    No {currentTab} units found in database
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.vehicle_id && (
                                <p className="text-red-600 text-sm font-bold ml-4">{errors.vehicle_id.message}</p>
                            )}
                        </div>

                        {/* Location Dropdown */}
                        <div className="flex flex-col gap-4">
                            <label className="font-bold text-[22px] ml-4 text-[#1e1e1e]">
                                Current Location
                            </label>
                            <div className="relative">
                                <select 
                                    {...register('location_id')}
                                    className={cn(
                                        "w-full h-[80px] px-8 rounded-[25px] border-2 text-[20px] bg-white outline-none appearance-none transition-all cursor-pointer",
                                        errors.location_id ? "border-red-500" : "border-[#dbdbdb] focus:border-[#840000]"
                                    )}
                                >
                                    <option value="">Select your current stop...</option>
                                    {locations.map((loc) => (
                                        <option key={loc.location_id} value={loc.location_id.toString()}>
                                            {loc.location_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.location_id && (
                                <p className="text-red-600 text-sm font-bold ml-4">{errors.location_id.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="flex flex-col gap-4">
                        <label className="font-bold text-[22px] flex justify-between ml-4 text-[#1e1e1e]">
                            Notes 
                            <span className={cn("text-[16px]", noteCount > 180 ? "text-red-500" : "text-gray-400")}>
                                {noteCount}/200
                            </span>
                        </label>
                        <textarea 
                            {...register('note')} 
                            className="flex-grow min-h-[220px] p-8 rounded-[30px] border-2 border-[#dbdbdb] resize-none focus:border-[#840000] outline-none text-[20px] transition-all" 
                            placeholder="Is the unit full? Is there a long line? Let others know!"
                        />
                        {errors.note && (
                            <p className="text-red-600 text-sm font-bold ml-4">{errors.note.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={cn(
                            "lg:col-span-2 w-full h-[85px] rounded-full text-white font-bold text-[32px] transition-all shadow-xl flex items-center justify-center gap-4",
                            isSubmitting 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#4e0000] hover:bg-[#840000] active:scale-[0.98]"
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Transmitting...
                            </>
                        ) : 'Submit Ping'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default PingPage;