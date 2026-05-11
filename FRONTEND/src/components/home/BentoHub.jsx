import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '@/utils/api';

const BentoHub = ({ latestPings = [], userData = null }) => {
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [locRes, vehRes] = await Promise.all([api.get('/locations'), api.get('/vehicles')]);
        if (locRes.data.success) setLocations(locRes.data.data);
        if (vehRes.data.success) setVehicles(vehRes.data.data);
      } catch (err) { console.error("Error loading form options", err); }
    };
    fetchOptions();
  }, []);

  const onQuickPing = async (data) => {
    try {
      const response = await api.post('/pings', data);
      if (response.data.success) {
        setStatusMsg({ type: 'success', text: 'Ping transmitted!' });
        reset();
        setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setStatusMsg({ type: 'error', text: error.response?.data?.message || "Login to ping units." });
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-24 bg-[#fcfcfc]">
      <div className="w-full max-w-[1440px] px-[170px] mb-12 text-left">
        <h2 className="font-display font-bold text-[48px] text-maroon-dark leading-tight">Campus Hub</h2>
        <p className="text-lg text-gray-500">Your central command for UPMin transit.</p>
      </div>

      <div className="orbit-bento-grid">
        {/* LIVE FEED */}
        <div className="bento-card col-span-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="bento-title">Live Unit Feed</h3>
            <Link to="/units" className="text-maroon-main font-bold text-sm hover:underline uppercase tracking-tighter">View All</Link>
          </div>
          <div className="unit-track">
            {latestPings.length > 0 ? (
              latestPings.map((ping) => (
                <div key={ping.ping_id} className="unit-mini-card">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-maroon-main text-lg">{ping.vehicle?.plate_number || '---'}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <span className="font-bold text-text-main truncate">{ping.location?.location_name || 'Moving...'}</span>
                  <span className="text-[11px] text-text-muted uppercase font-mono">
                    {new Date(ping.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : <div className="w-full py-10 text-center text-gray-400 italic">No recent sightings in orbit.</div>}
          </div>
        </div>

        {/* REFINED DASHBOARD CARD (Rank Removed) */}
        <div className="bento-card col-span-4 row-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="bento-title mb-0">Dashboard</h3>
            <span className="text-[11px] font-bold px-3 py-1 bg-maroon-main/5 text-maroon-dark rounded-full uppercase tracking-widest">
              {userData ? `Level ${userData.user.level}` : 'Status'}
            </span>
          </div>

          <div className="flex-grow flex flex-col justify-center">
             {userData ? (
               <div className="space-y-10 px-4">
                 {/* XP PROGRESS SECTION */}
                 <div className="text-left">
                   <div className="flex justify-between items-end mb-3">
                     <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">XP Progress</span>
                     <span className="text-[11px] font-bold text-maroon-dark">{userData.user.points} XP</span>
                   </div>
                   <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-maroon-dark transition-all duration-1000 ease-out" 
                        style={{ width: `${userData.level_progress?.percentage || 0}%` }} 
                     />
                   </div>
                 </div>

                 {/* REFINED STATS: RANK REMOVED, PINGS CENTERED */}
                 <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 rounded-[32px] border border-gray-100">
                    <span className="text-[48px] font-black text-maroon-dark leading-none">{userData.ping_count}</span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-[0.2em]">Total Pings</span>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center text-center px-6">
                 <i className="fa-solid fa-gauge-high text-4xl text-maroon-main/20 mb-4"></i>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">Log in to view your contribution level and XP progress.</p>
               </div>
             )}
          </div>

          <Link to="/dashboard" className="ping-submit w-full mt-10 flex items-center justify-center py-5 bg-maroon-dark text-white rounded-[20px] font-bold hover:bg-maroon-main transition-all">
            {userData ? "Open Profile" : "Open Full Dashboard"}
          </Link>
        </div>

        {/* QUICK PING FORM */}
        <div className="bento-card col-span-8">
          <h3 className="bento-title mb-6">Quick Ping</h3>
          <form onSubmit={handleSubmit(onQuickPing)} className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vehicle Unit</label>
               <select {...register('vehicle_id', { required: true })} className="ping-select w-full p-4 border rounded-xl bg-gray-50 text-sm">
                  <option value="">Select Unit...</option>
                  {vehicles.map(v => <option key={v.vehicle_id} value={v.vehicle_id}>{v.plate_number}</option>)}
               </select>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Landmark</label>
               <select {...register('location_id', { required: true })} className="ping-select w-full p-4 border rounded-xl bg-gray-50 text-sm">
                  <option value="">Select Location...</option>
                  {locations.map(l => <option key={l.location_id} value={l.location_id}>{l.location_name}</option>)}
               </select>
            </div>
            <div className="col-span-2">
               {statusMsg.text && <p className={`text-xs font-bold mb-2 ${statusMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{statusMsg.text}</p>}
               <button type="submit" disabled={isSubmitting} className="ping-submit w-full py-5 bg-maroon-dark text-white rounded-xl font-bold hover:bg-maroon-main transition-colors disabled:opacity-50">
                 {isSubmitting ? "Transmitting..." : "Ping Now"}
               </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BentoHub;