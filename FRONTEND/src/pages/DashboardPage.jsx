import React from 'react';
import { useDashboardLogic } from '../features/dashboard/useDashboardLogic';
import { cn } from '../utils/cn';

const DashboardPage = () => {
    const { userData, globalStats, dashboardData, progressPercentage, loading, error } = useDashboardLogic();

    if (loading) return <div className="flex min-h-screen items-center justify-center font-bold text-[#840000] animate-pulse">Establishing Connection...</div>;
    if (error) return <div className="flex min-h-screen items-center justify-center text-red-600 font-bold">{error}</div>;

    return (
        <main className="w-full max-w-[1700px] px-[120px] pt-16 flex flex-col items-start gap-12 mx-auto select-none pb-20">
            
            <div className="flex flex-col gap-2">
                <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">Command Center</h1>
                <p className="font-body text-[24px] text-[#757373]">
                    Safe travels, <span className="text-[#840000] font-bold">{userData?.name}</span>
                </p>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-10">
                    
                    {/* User Rank & Progress */}
                    <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-12 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <i className="fa-solid fa-satellite-dish text-[120px]"></i>
                        </div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="font-body font-bold text-[#757373] uppercase text-[14px] tracking-widest">Orbital Status</span>
                                <h2 className="font-display font-bold text-[56px] text-[#840000] leading-none">Level {userData?.level || 1}</h2>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-[24px] font-bold">{userData?.points || 0} XP</div>
                                <div className="text-[12px] text-[#757373] uppercase font-bold">Total Transmissions: {dashboardData?.ping_count}</div>
                            </div>
                        </div>
                        <div className="w-full h-[20px] bg-[#f2f2f2] rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-[#4e0000] to-[#840000] transition-all duration-1000" 
                                style={{ width: `${progressPercentage}%` }} 
                            />
                        </div>
                    </div>

                    {/* Recent Transmissions (Live Data) */}
                    <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-sm">
                        <h3 className="font-display font-bold text-[28px] mb-8">Recent History</h3>
                        <div className="flex flex-col gap-4">
                            {dashboardData?.recent_pings?.length > 0 ? (
                                dashboardData.recent_pings.map((ping) => (
                                    <div key={ping.ping_id} className="flex items-center justify-between p-6 bg-[#fcfcfc] rounded-2xl border border-[#eeeeee]">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-[#840000]/10 rounded-full flex items-center justify-center text-[#840000]">
                                                <i className="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[18px]">{ping.location?.location_name}</p>
                                                <p className="text-[14px] text-[#757373]">Unit: {ping.vehicle?.plate_number}</p>
                                            </div>
                                        </div>
                                        <span className="font-mono text-[14px] text-gray-400">{new Date(ping.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-10 text-[#757373] italic">No transmissions recorded yet. Start pinging to earn points!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="flex flex-col gap-8">
                    <div className="bg-[#840000] rounded-[35px] p-10 text-white shadow-xl">
                        <div className="font-mono font-bold text-[56px] leading-tight">{globalStats?.active_vehicles || 0}</div>
                        <div className="font-body text-[14px] uppercase font-bold opacity-70 tracking-widest">Active Fleet Units</div>
                        <hr className="my-6 opacity-20" />
                        <div className="font-mono font-bold text-[56px] leading-tight">{globalStats?.active_locations || 0}</div>
                        <div className="font-body text-[14px] uppercase font-bold opacity-70 tracking-widest">Verified Stops</div>
                    </div>

                    <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-sm">
                        <h3 className="font-display font-bold text-[24px] mb-6">Network Health</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-sm font-bold text-green-700">Database Sync: ACTIVE</p>
                            </div>
                            <div className="p-6 bg-[#f9f9f9] rounded-2xl border-l-4 border-l-[#840000]">
                                <p className="text-xs text-[#757373] uppercase font-bold mb-2">Transit Tip</p>
                                <p className="text-sm leading-relaxed text-[#1e1e1e]">
                                    Pings expire after 30 minutes of inactivity. Keep the orbit updated to help your fellow passengers!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;