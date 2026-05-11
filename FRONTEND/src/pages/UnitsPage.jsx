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

    // Show loading state while syncing with the Laravel API
    if (loading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="text-center font-mono animate-pulse text-[#840000] text-xl tracking-widest">
                    SYNCING_REGISTRY...
                </div>
            </main>
        );
    }

    // Map 'jeep' tab to 'ikot' data and 'tricycle' tab to 'toda' data
    const activeUnits = transportationUnits[currentUnitTab] || [];

    return (
        <main className="w-full max-w-[1700px] px-[120px] pt-16 flex flex-col items-start gap-12 mx-auto content-wrapper select-none">
            <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">
                Transportation Units
            </h1>

            <div className="w-full bg-white border border-[#dbdbdb] rounded-[27px] p-10 shadow-[0_4px_60px_rgba(132,0,0,0.12)]">
                {/* Tab Navigation */}
                <div className="flex gap-12 mb-10 border-b border-[#dbdbdb]">
                    <button 
                        onClick={() => setCurrentUnitTab('jeep')}
                        className={cn(
                            "font-body font-bold text-[28px] pb-2 transition-all border-b-4",
                            currentUnitTab === 'jeep' ? "text-[#840000] border-[#840000]" : "text-[#999999] border-transparent"
                        )}
                    >
                        Ikot Jeeps
                    </button>
                    <button 
                        onClick={() => setCurrentUnitTab('tricycle')}
                        className={cn(
                            "font-body font-bold text-[28px] pb-2 transition-all border-b-4",
                            currentUnitTab === 'tricycle' ? "text-[#840000] border-[#840000]" : "text-[#999999] border-transparent"
                        )}
                    >
                        Tricycles
                    </button>
                </div>

                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-left font-body font-bold text-[21px] text-[#1e1e1e]">
                            <th className="px-10 py-4">Plate Number</th>
                            <th className="px-10 py-4">Body Number</th>
                            <th className="px-10 py-4">Last Reported Stop</th>
                            <th className="px-10 py-4">Time</th>
                            <th className="px-10 py-4 text-center">Status</th>
                            <th className="px-10 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="font-body">
                        {activeUnits.length > 0 ? (
                            activeUnits.map((unit) => (
                                <tr key={unit.vehicle_id} className="group cursor-default relative">
                                    <td className="px-10 py-6 font-mono font-bold text-[22px] text-[#840000] transition-all duration-300 rounded-l-[20px] group-hover:bg-[#840000] group-hover:text-white group-hover:shadow-[0_8px_30px_rgba(132,0,0,0.4)]">
                                        {unit.plate_number}
                                    </td>
                                    
                                    <td className="px-10 py-6 text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white">
                                        #{unit.body_number}
                                    </td>
                                    
                                    <td className="px-10 py-6 text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "w-2.5 h-2.5 rounded-full transition-colors",
                                                unit.is_active ? "bg-green-500 group-hover:bg-white" : "bg-gray-300"
                                            )} />
                                            {/* Matches the 'lastLandmark' key from the controller map */}
                                            <span className="whitespace-nowrap">{unit.lastLandmark || 'No reported stop'}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-10 py-6 font-mono text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white whitespace-nowrap">
                                        {unit.timestamp || '--:--'}
                                    </td>
                                    
                                    <td className="px-10 py-6 text-center transition-all duration-300 group-hover:bg-[#840000]">
                                        <div className="flex justify-center">
                                            <span className={cn(
                                                "inline-flex items-center justify-center h-[42px] min-w-[130px] px-6 rounded-full font-display font-bold text-[16px] border-2 transition-all",
                                                unit.is_active 
                                                ? "bg-[#e8f5e9] border-[#a5d6a7] text-[#1b5e20] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white" 
                                                : "bg-[#f5f5f5] border-[#e0e0e0] text-[#757575] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white"
                                            )}>
                                                {unit.is_active ? 'ACTIVE' : 'OFF-DUTY'}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-10 py-6 text-center transition-all duration-300 rounded-r-[20px] group-hover:bg-[#840000] group-hover:shadow-[0_8px_30px_rgba(132,0,0,0.4)]">
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => setSelectedVehicle(unit)}
                                                className="h-[42px] min-w-[130px] px-6 rounded-full bg-[#4e0000] text-white font-display font-bold text-[15px] hover:brightness-125 transition-all shadow-md group-hover:bg-black/20 group-hover:border group-hover:border-white/20"
                                            >
                                                More Info
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-20 text-center font-mono text-gray-400 uppercase tracking-widest">
                                    No {currentUnitTab} units found in registry.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* More Info Modal - Displays real history */}
            {selectedVehicle && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedVehicle(null)} />
                    <div className="relative bg-white rounded-[27px] shadow-2xl w-full max-w-[500px] overflow-hidden animate-in zoom-in duration-300">
                        <div className="bg-[#840000] p-8 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-[48px] font-bold font-mono leading-none tracking-tight">
                                    {selectedVehicle.plate_number}
                                </h2>
                                <div className="mt-4 font-body opacity-90 uppercase tracking-[0.1em] font-bold text-[14px]">
                                    Body Number: {selectedVehicle.body_number}
                                </div>
                            </div>
                            <button onClick={() => setSelectedVehicle(null)} className="text-white hover:rotate-90 transition-transform duration-200">
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
                                    selectedVehicle.routeHistory.map((step, idx) => (
                                        <div key={idx} className="relative pl-10 group/item">
                                            <div className={cn(
                                                "absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white transition-all duration-300",
                                                idx === 0 ? "bg-[#840000] ring-4 ring-[#840000]/20" : "bg-gray-300"
                                            )} />
                                            <div className="flex justify-between items-start">
                                                <p className={cn(
                                                    "font-bold text-[18px]",
                                                    idx === 0 ? "text-[#840000]" : "text-[#1e1e1e]"
                                                )}>
                                                    {step.landmark}
                                                </p>
                                                <span className="font-mono text-[14px] text-[#757373]">
                                                    {step.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))
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