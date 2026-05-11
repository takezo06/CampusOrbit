import React from 'react';
import { useDashboardLogic } from '../features/dashboard/useDashboardLogic';

const DashboardPage = () => {
    const { userData, globalStats, progressPercentage, loading, error } = useDashboardLogic();

    if (loading) return <div className="flex min-h-screen items-center justify-center font-bold text-[#840000]">Syncing Orbit Data...</div>;
    if (error) return <div className="flex min-h-screen items-center justify-center text-red-600 font-bold">{error}</div>;

    return (
        <main className="w-full max-w-[1700px] px-[120px] pt-16 flex flex-col items-start gap-12 mx-auto select-none">
            
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">Dashboard</h1>
                <p className="font-body text-[24px] text-[#757373]">
                    Welcome back, <span className="text-[#840000] font-bold">{userData?.name}</span>
                </p>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-10">
                    
                    {/* User Rank Card */}
                    <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-12 shadow-sm">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="font-body font-bold text-[#757373] uppercase text-[14px]">Your Rank</span>
                                <h2 className="font-display font-bold text-[56px] text-[#840000] leading-none">Level {userData?.level || 1}</h2>
                            </div>
                            <div className="font-mono text-[20px]">{userData?.points || 0} XP</div>
                        </div>
                        <div className="w-full h-[25px] bg-[#f2f2f2] rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#840000] transition-all duration-1000" 
                                style={{ width: `${progressPercentage}%` }} 
                            />
                        </div>
                    </div>

                    {/* Global System Stats (Matching your PHP keys) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#840000] rounded-[30px] p-10 text-white shadow-lg">
                            <div className="font-mono font-bold text-[48px]">{globalStats?.daily_passengers}</div>
                            <div className="font-body text-[16px] uppercase font-bold opacity-80">Daily Passengers</div>
                        </div>

                        <div className="bg-[#003a00] rounded-[30px] p-10 text-white shadow-lg">
                            <div className="font-mono font-bold text-[48px]">{globalStats?.active_vehicles}</div>
                            <div className="font-body text-[16px] uppercase font-bold opacity-80">Active Units</div>
                        </div>

                        <div className="bg-white border border-[#dbdbdb] rounded-[30px] p-10 shadow-sm">
                            <div className="font-mono font-bold text-[48px] text-[#1e1e1e]">{globalStats?.active_locations}</div>
                            <div className="font-body text-[16px] uppercase font-bold text-[#757373]">Active Stops</div>
                        </div>

                        <div className="bg-white border border-[#dbdbdb] rounded-[30px] p-10 shadow-sm">
                            <div className="font-mono font-bold text-[48px] text-[#1e1e1e]">{globalStats?.registered_operators}</div>
                            <div className="font-body text-[16px] uppercase font-bold text-[#757373]">Drivers Online</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Activity */}
                <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-sm">
                    <h3 className="font-display font-bold text-[24px] mb-6">System Status</h3>
                    <div className="flex flex-col gap-4">
                        <div className="p-4 bg-[#f9f9f9] rounded-xl border border-l-4 border-l-[#003a00]">
                            <p className="text-sm font-bold">Network Status</p>
                            <p className="text-xs text-green-700 font-bold">ALL SYSTEMS OPERATIONAL</p>
                        </div>
                        <p className="text-[14px] text-[#757373] italic mt-4 text-center">
                            Real-time campus transit data is currently synced with UP Mindanao servers.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;