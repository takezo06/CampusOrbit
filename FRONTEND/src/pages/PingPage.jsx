import React, { useState, useRef, useEffect } from 'react';
import { usePingLogic } from '../features/ping/usePingLogic';
import { cn } from '../utils/cn';

const PingPage = () => {
    const { 
        currentTab, setCurrentTab, userData, locations,
        register, handleSubmit, setValue,
        errors, isSubmitting, noteCount 
    } = usePingLogic();

    const [isVehicleOpen, setIsVehicleOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState("Select a Vehicle Unit");
    const vehicleRef = useRef(null);

    const vehicleOptions = currentTab === 'ikot' 
        ? [{ id: "1", label: "VFK307 (Ikot)" }, { id: "2", label: "GAP670 (Ikot)" }]
        : [{ id: "3", label: "TODA-01 (Toda)" }, { id: "4", label: "TODA-12 (Toda)" }];

    return (
        <main className="w-full max-w-[1440px] px-[170px] pt-16 flex flex-col items-start gap-12 mx-auto select-none">
            <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">Ping Now</h1>

            <div className="w-full bg-white border border-[#dbdbdb] rounded-[35px] p-16 shadow-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-10">
                        {/* Vehicle Dropdown */}
                        <div className="flex flex-col gap-4 relative" ref={vehicleRef}>
                            <label className="font-bold text-[22px] ml-4">Vehicle Unit</label>
                            <div onClick={() => setIsVehicleOpen(!isVehicleOpen)} className="w-full h-[80px] px-8 rounded-[25px] border-2 border-[#dbdbdb] flex items-center justify-between cursor-pointer">
                                <span>{selectedVehicle}</span>
                                {isVehicleOpen && (
                                    <div className="absolute top-[90px] left-0 w-full bg-white border-2 rounded-[25px] z-50 shadow-xl overflow-hidden">
                                        {vehicleOptions.map(opt => (
                                            <div key={opt.id} onClick={() => { setSelectedVehicle(opt.label); setValue('vehicle_id', opt.id); setIsVehicleOpen(false); }} className="px-8 py-5 hover:bg-[#840000] hover:text-white transition-colors">{opt.label}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location Dropdown */}
                        <div className="flex flex-col gap-4">
                            <label className="font-bold text-[22px] ml-4">Current Location</label>
                            <select {...register('location_id')} className="w-full h-[80px] px-8 rounded-[25px] border-2 border-[#dbdbdb] text-[20px] bg-white outline-none">
                                <option value="">Select your current stop...</option>
                                {locations.map(loc => (
                                    <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="font-bold text-[22px] flex justify-between ml-4">Notes <span>{noteCount}/200</span></label>
                        <textarea {...register('note')} className="flex-grow min-h-[220px] p-10 rounded-[30px] border-2 border-[#dbdbdb] resize-none outline-none text-[20px]" placeholder="Any extra details?" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="lg:col-span-2 w-full h-[85px] rounded-full bg-[#4e0000] text-white font-bold text-[32px]">
                        {isSubmitting ? 'Transmitting...' : 'Submit Ping'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default PingPage;