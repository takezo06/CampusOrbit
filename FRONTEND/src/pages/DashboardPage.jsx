import React from 'react';
import { useDashboardLogic } from '../features/dashboard/useDashboardLogic';
import { cn } from '../utils/cn';

const DashboardPage = () => {
const { userData, progressPercentage } = useDashboardLogic();

return (
    <main className="w-full max-w-[1700px] px-[120px] pt-16 flex flex-col items-start gap-12 mx-auto content-wrapper select-none">
    
    {/* Header Section */}
    <div className="flex flex-col gap-2">
        <h1 className="font-body font-bold text-[86px] text-[#1e1e1e] tracking-tight leading-none">
        Passenger Dashboard
        </h1>
        <p className="font-body text-[24px] text-[#757373] ml-2">
        Welcome back, <span className="text-[#840000] font-bold">{userData.name}</span>
        </p>
    </div>

    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COL: Profile & Level (Spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
        
        {/* Level Progress Card */}
        <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-12 shadow-[0_10px_60px_rgba(132,0,0,0.08)]">
            <div className="flex justify-between items-end mb-8">
            <div>
                <span className="font-body font-bold text-[#757373] uppercase tracking-widest text-[16px]">Current Rank</span>
                <h2 className="font-display font-bold text-[56px] text-[#840000] leading-none">Level {userData.level}</h2>
            </div>
            <div className="text-right font-mono text-[20px] text-[#1e1e1e]">
                {userData.points} / {userData.pointsToNextLevel} XP
            </div>
            </div>

            {/* Aesthetic Progress Bar */}
            <div className="w-full h-[30px] bg-[#f2f2f2] rounded-full overflow-hidden border border-[#dbdbdb]">
            <div 
                className="h-full bg-gradient-to-r from-[#4e0000] to-[#840000] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
            />
            </div>
            <p className="mt-6 font-body text-[#757373] text-[18px]">
            Earn <span className="font-bold text-[#003a00]">{userData.pointsToNextLevel - userData.points} more XP</span> to reach Level {userData.level + 1}
            </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#840000] rounded-[30px] p-10 text-white shadow-xl flex items-center gap-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                <i className="fa-solid fa-satellite-dish"></i>
            </div>
            <div>
                <div className="font-mono font-bold text-[48px] leading-none">{userData.totalPings}</div>
                <div className="font-body text-[18px] opacity-80 uppercase tracking-wider font-bold">Total Pings</div>
            </div>
            </div>

            <div className="bg-[#003a00] rounded-[30px] p-10 text-white shadow-xl flex items-center gap-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div>
                <div className="font-mono font-bold text-[36px] leading-none">{userData.joinedDate}</div>
                <div className="font-body text-[18px] opacity-80 uppercase tracking-wider font-bold">Orbit Member Since</div>
            </div>
            </div>
        </div>
        </div>

        {/* RIGHT COL: Recent Activity */}
        <div className="bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-[0_10px_60px_rgba(132,0,0,0.08)]">
        <h3 className="font-display font-bold text-[28px] text-[#1e1e1e] mb-8 border-b pb-4">Recent Pings</h3>
        
        <div className="flex flex-col gap-6">
            {userData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex flex-col gap-2 p-6 rounded-[22px] bg-[#f9f9f9] border border-[#dbdbdb] hover:border-[#840000] transition-all group">
                <div className="flex justify-between items-start">
                <span className="font-mono font-bold text-[20px] text-[#840000]">{activity.vehicle}</span>
                <span className={cn(
                    "px-3 py-1 rounded-md font-display font-bold text-[12px] text-white",
                    activity.type === 'Ikot' ? "bg-[#840000]" : "bg-[#003a00]"
                )}>
                    {activity.type.toUpperCase()}
                </span>
                </div>
                <p className="font-body text-[16px] text-[#1e1e1e] font-bold">{activity.landmark}</p>
                <span className="font-body text-[14px] text-[#999999]">{activity.time}</span>
            </div>
            ))}
        </div>

        <button className="w-full mt-8 py-4 rounded-xl border-2 border-[#840000] text-[#840000] font-display font-bold hover:bg-[#840000] hover:text-white transition-all">
            View All History
        </button>
        </div>

    </div>
    </main>
);
};

export default DashboardPage;