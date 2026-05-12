import React from 'react';
import { useUnitsLogic } from '../features/units/useUnitsLogic';
import { cn } from '../utils/cn'; 

const UnitsPage = () => {
    const { 
        currentUnitTab, 
        setCurrentUnitTab, 
        transportationUnits,
        selectedVehicle,
        setSelectedVehicle,
        loading 
    } = useUnitsLogic();

    // Helper to safely format dates and times for the responsive sighting column
    const formatDateTime = (dateString) => {
        if (!dateString) return { date: '--/--/--', time: '--:--' };
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return { date: '--/--/--', time: '--:--' };

        return {
            date: dateObj.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' }),
            time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            modalDate: dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' })
        };
    };

    if (loading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="text-center font-mono animate-pulse text-[#840000] text-xl tracking-widest uppercase">
                    SYNCING_REGISTRY...
                </div>
            </main>
        );
    }

    const activeUnits = transportationUnits[currentUnitTab] || [];

    return (
        <main className="orbit-container pt-12 flex flex-col items-start gap-10 select-none pb-20">
            <h1 className="orbit-h1">Transportation Units</h1>

            <div className="orbit-card w-full overflow-hidden"> {/* overflow-hidden protects the card radius */}
                {/* Tab Navigation */}
                <div className="flex gap-4 sm:gap-8 mb-8 border-b border-[#dbdbdb]">
                    <button 
                        onClick={() => setCurrentUnitTab('jeep')}
                        className={cn(
                            "font-body font-bold text-[20px] sm:text-[28px] pb-2 transition-all border-b-4",
                            currentUnitTab === 'jeep' ? "text-[#840000] border-[#840000]" : "text-[#999999] border-transparent"
                        )}
                    >
                        Ikot Jeeps
                    </button>
                    <button 
                        onClick={() => setCurrentUnitTab('tricycle')}
                        className={cn(
                            "font-body font-bold text-[20px] sm:text-[28px] pb-2 transition-all border-b-4",
                            currentUnitTab === 'tricycle' ? "text-[#840000] border-[#840000]" : "text-[#999999] border-transparent"
                        )}
                    >
                        Tricycles
                    </button>
                </div>

                {/* 1. RESPONSIVE WRAPPER: Allows horizontal scroll on mobile if needed */}
                <div className="w-full overflow-x-auto no-scrollbar">
                    <table className="w-full border-separate border-spacing-y-3 min-w-[800px] lg:min-w-full">
                        <thead>
                            <tr className="text-left font-body font-bold text-[16px] sm:text-[18px] text-[#1e1e1e]">
                                <th className="px-4 sm:px-8 py-4">Unit</th>
                                <th className="px-4 sm:px-8 py-4">Reported Stop</th>
                                {/* Hide notes on tablet/mobile if space is tight */}
                                <th className="px-4 sm:px-8 py-4 hidden xl:table-cell">Ping Note</th> 
                                <th className="px-4 sm:px-8 py-4">Sighting</th>
                                <th className="px-4 sm:px-8 py-4 text-center">Status</th>
                                <th className="px-4 sm:px-8 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="font-body">
                            {activeUnits.length > 0 ? (
                                activeUnits.map((unit) => {
                                    const timing = formatDateTime(unit.timestamp);

                                    return (
                                        <tr key={unit.vehicle_id} className="group cursor-default relative">
                                            <td className="px-4 sm:px-8 py-6 rounded-l-[20px] transition-all duration-300 group-hover:bg-[#840000]">
                                                <div className="flex flex-col">
                                                    <span className="font-mono font-bold text-[18px] sm:text-[22px] text-[#840000] group-hover:text-white leading-tight">
                                                        {unit.plate_number}
                                                    </span>
                                                    <span className="text-[10px] sm:text-[12px] font-bold text-[#757373] group-hover:text-white/70 tracking-widest uppercase">
                                                        #{unit.body_number}
                                                    </span>
                                                </div>
                                            </td>
                                            
                                            <td className="px-4 sm:px-8 py-6 text-[14px] sm:text-[16px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white">
                                                <div className="flex items-center gap-3">
                                                    <span className={cn(
                                                        "w-2.5 h-2.5 rounded-full shrink-0",
                                                        unit.is_active ? "bg-green-500 group-hover:bg-white" : "bg-gray-300"
                                                    )} />
                                                    <span className="font-bold truncate max-w-[120px] sm:max-w-none">
                                                        {unit.lastLandmark || 'Stable'}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 sm:px-8 py-6 transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white max-w-[200px] hidden xl:table-cell">
                                                <p className="text-[13px] italic leading-tight opacity-80 line-clamp-2">
                                                    {unit.routeHistory?.[0]?.note || "No specific notes."}
                                                </p>
                                            </td>
                                            
                                            <td className="px-4 sm:px-8 py-6 font-mono text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white whitespace-nowrap">
                                                <div className="flex flex-col items-start leading-tight">
                                                    <span className="text-[11px] opacity-70 uppercase">{timing.date}</span>
                                                    <span className="font-bold text-[14px]">{timing.time}</span>
                                                </div>
                                            </td>                                    
                                            
                                            <td className="px-4 sm:px-8 py-6 text-center transition-all duration-300 group-hover:bg-[#840000]">
                                                <span className={cn(
                                                    "inline-flex items-center justify-center h-[34px] sm:h-[38px] min-w-[90px] sm:min-w-[110px] px-3 sm:px-4 rounded-full font-display font-bold text-[12px] sm:text-[14px] border-2 transition-all",
                                                    unit.is_active 
                                                    ? "bg-[#e8f5e9] border-[#a5d6a7] text-[#1b5e20] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white" 
                                                    : "bg-[#f5f5f5] border-[#e0e0e0] text-[#757575] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white"
                                                )}>
                                                    {unit.is_active ? 'ACTIVE' : 'OFF'}
                                                </span>
                                            </td>
                                            
                                            <td className="px-4 sm:px-8 py-6 text-center transition-all duration-300 rounded-r-[20px] group-hover:bg-[#840000]">
                                                <button 
                                                    onClick={() => setSelectedVehicle(unit)}
                                                    className="h-[34px] sm:h-[38px] min-w-[90px] sm:min-w-[110px] px-3 sm:px-4 rounded-full bg-[#4e0000] text-white font-display font-bold text-[12px] sm:text-[14px] hover:brightness-125 transition-all shadow-md group-hover:bg-black/20 group-hover:border group-hover:border-white/20"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center font-mono text-gray-400 uppercase tracking-widest italic">
                                        No registry records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Logic */}
            {selectedVehicle && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedVehicle(null)} />
                    <div className="relative bg-white rounded-[27px] shadow-2xl w-full max-w-[500px] overflow-hidden">
                        <div className="bg-[#840000] p-8 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-[48px] font-bold font-mono leading-none tracking-tight">
                                    {selectedVehicle.plate_number}
                                </h2>
                                <div className="mt-4 font-body opacity-90 uppercase tracking-[0.1em] font-bold text-[14px]">
                                    Body Number: {selectedVehicle.body_number}
                                </div>
                            </div>
                            <button onClick={() => setSelectedVehicle(null)} className="text-white">
                                <i className="fa-solid fa-xmark text-3xl"></i>
                            </button>
                        </div>

                        <div className="p-10 font-body max-h-[60vh] overflow-y-auto">
                            <h3 className="text-[#1e1e1e] font-bold text-[20px] mb-8 flex items-center gap-3">
                                <i className="fa-solid fa-route text-[#840000]"></i>
                                Recent Transit History
                            </h3>
                            
                            <div className="relative border-l-2 border-dashed border-gray-200 ml-3 space-y-10">
                                {selectedVehicle.routeHistory?.length > 0 ? (
                                    selectedVehicle.routeHistory.map((step, idx) => {
                                        // Use the safety helper here too
                                        const stepTiming = formatDateTime(step.time);

                                        return (
                                            <div key={idx} className="relative pl-10 group/item">
                                                <div className={cn(
                                                    "absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white transition-all duration-300",
                                                    idx === 0 ? "bg-[#840000] ring-4 ring-[#840000]/20" : "bg-gray-300"
                                                )} />
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className={cn("font-bold text-[18px]", idx === 0 ? "text-[#840000]" : "text-[#1e1e1e]")}>
                                                            {step.landmark}
                                                        </p>
                                                    </div>
                                                    <div className="text-right font-mono text-[13px] text-[#757373]">
                                                        <div>{stepTiming.modalDate}</div>
                                                        <div className="font-bold text-[#1e1e1e]">{stepTiming.time}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="py-10 text-center text-gray-400 italic">
                                        No recent location updates found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default UnitsPage;