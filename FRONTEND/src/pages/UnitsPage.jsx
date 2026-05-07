import React from 'react';
import { useUnitsLogic } from '../features/units/useUnitsLogic';
import { cn } from '../utils/cn'; 

const UnitsPage = () => {
const { 
    currentUnitTab, 
    setCurrentUnitTab, 
    transportationUnits,
    selectedVehicle,
    setSelectedVehicle
} = useUnitsLogic();

const activeUnits = transportationUnits[currentUnitTab] || [];

return (
    <main className="w-full max-w-[1700px] px-[120px] pt-16 flex flex-col items-start gap-12 mx-auto content-wrapper select-none">
    {/* Page Title - font-body (Plus Jakarta Sans) */}
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
            Jeeps
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
            <th className="px-10 py-4">Unit ID</th>
            <th className="px-10 py-4">Driver / Operator</th>
            <th className="px-10 py-4">Last Ping Landmark</th>
            <th className="px-10 py-4">Timestamp</th>
            <th className="px-10 py-4 text-center">Status</th>
            <th className="px-10 py-4 text-center">Actions</th>
            </tr>
        </thead>
        <tbody className="font-body">
            {activeUnits.map((unit) => {
            const isActive = unit.status.toLowerCase() === 'active';

            return (
                <tr key={unit.id} className="group cursor-default relative">
                {/* Unit ID - font-mono (JetBrains Mono) */}
                <td className="px-10 py-6 font-mono font-bold text-[22px] text-[#840000] transition-all duration-300 rounded-l-[20px] group-hover:bg-[#840000] group-hover:text-white group-hover:shadow-[0_8px_30px_rgba(132,0,0,0.4)]">
                    {unit.id}
                </td>
                
                {/* Driver - font-body */}
                <td className="px-10 py-6 text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white">
                    {unit.driver}
                </td>
                
                {/* Landmark - font-body */}
                <td className="px-10 py-6 text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white">
                    <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bd0303] group-hover:bg-white transition-colors" />
                    <span className="whitespace-nowrap">{unit.lastLandmark}</span>
                    </div>
                </td>
                
                {/* Timestamp - font-mono */}
                <td className="px-10 py-6 font-mono text-[18px] text-[#1e1e1e] transition-all duration-300 group-hover:bg-[#840000] group-hover:text-white whitespace-nowrap">
                    {unit.timestamp}
                </td>
                
                {/* Status Pill - Optimized for light bg + dark text */}
                <td className="px-10 py-6 text-center transition-all duration-300 group-hover:bg-[#840000]">
                    <div className="flex justify-center">
                    <span className={cn(
                        "inline-flex items-center justify-center h-[42px] min-w-[130px] px-6 rounded-full font-display font-bold text-[16px] border-2 transition-all",
                        isActive 
                        ? "bg-[#e8f5e9] border-[#a5d6a7] text-[#1b5e20] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white" 
                        : "bg-[#ffebee] border-[#ef9a9a] text-[#b71c1c] group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white"
                    )}>
                        {unit.status.toUpperCase()}
                    </span>
                    </div>
                </td>
                
                {/* Actions Button */}
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
            );
            })}
        </tbody>
        </table>
    </div>

    {/* Centered Modal Overlay */}
    {selectedVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop with Blur based on §4.2 */}
            <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedVehicle(null)} 
            />
            
            <div className="relative bg-white rounded-[27px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header - Maroon Solid */}
            <div className="bg-[#840000] p-8 text-white flex justify-between items-start">
                <div>
                <h2 className="text-[48px] font-bold font-mono leading-none tracking-tight">
                    {selectedVehicle.id}
                </h2>
                <div className="mt-4 font-body opacity-90 uppercase tracking-[0.1em] font-bold text-[14px]">
                    Driver: {selectedVehicle.driver}
                </div>
                </div>
                <button 
                onClick={() => setSelectedVehicle(null)} 
                className="text-white hover:rotate-90 transition-transform duration-200"
                >
                <i className="fa-solid fa-xmark text-3xl"></i>
                </button>
            </div>

            {/* Timeline Section */}
            <div className="p-8 font-body max-h-[60vh] overflow-y-auto">
                <div className="flex flex-col gap-0 relative">
                {selectedVehicle.routeHistory.map((step, idx) => {
                    const isLatest = idx === 0;
                    return (
                    <div 
                        key={idx} 
                        className="flex gap-6 group/item transition-all duration-300 px-4 py-3 -mx-4 rounded-[15px] hover:bg-[#840000] hover:shadow-lg"
                    >
                        {/* Timeline Visuals */}
                        <div className="flex flex-col items-center">
                        {/* Circle - Numbers removed as requested */}
                        <div className={cn(
                            "w-6 h-6 rounded-full border-2 transition-all duration-300 z-10 mt-1",
                            isLatest 
                            ? "bg-[#840000] border-[#840000] group-hover/item:bg-white group-hover/item:border-white" 
                            : "bg-white border-[#dbdbdb] group-hover/item:border-white group-hover/item:bg-transparent"
                        )} />
                        
                        {/* Dashed Connector */}
                        {idx !== selectedVehicle.routeHistory.length - 1 && (
                            <div className="w-0.5 h-14 border-l-2 border-dashed border-[#dbdbdb] group-hover/item:border-white/30" />
                        )}
                        </div>

                        {/* Stop Info */}
                        <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                            <p className={cn(
                            "font-bold text-[18px] transition-colors duration-300",
                            isLatest ? "text-[#840000]" : "text-[#1e1e1e]",
                            "group-hover/item:text-white"
                            )}>
                            {step.landmark}
                            </p>
                            <span className={cn(
                            "font-mono text-[14px] transition-colors duration-300",
                            "text-[#757373] group-hover/item:text-white/80"
                            )}>
                            {step.time}
                            </span>
                        </div>
                        <p className={cn(
                            "text-[14px] transition-colors duration-300",
                            "text-[#757373] group-hover/item:text-white/70"
                        )}>
                            {step.building}
                        </p>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>
        </div>
    )}
    </main>
);
};

export default UnitsPage;