import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '@/utils/api'; 
import { cn } from '../../utils/cn';

const BentoHub = ({ latestPings = [], userData = null }) => {
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  
  // Custom Dropdown States
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [selectedUnitLabel, setSelectedUnitLabel] = useState("Identify Unit...");
  const [selectedLocLabel, setSelectedLocLabel] = useState("Identify Location...");
  
  const unitRef = useRef(null);
  const locRef = useRef(null);

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  // FIX: Map data based on the dashboard() response structure
  // userData usually comes from useHomeLogic which fetches /auth/dashboard
  const user = userData?.user; 
  const progress = userData?.level_progress || { percentage: 0 };
  const transmissions = userData?.ping_count || 0;

  // Handle outside clicks to close menus
  useEffect(() => {
    const clickOut = (e) => {
      if (unitRef.current && !unitRef.current.contains(e.target)) setIsUnitOpen(false);
      if (locRef.current && !locRef.current.contains(e.target)) setIsLocOpen(false);
    };
    document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [locRes, vehRes] = await Promise.all([api.get('/locations'), api.get('/vehicles')]);
        if (locRes.data.success) setLocations(locRes.data.data);
        if (vehRes.data.success) setVehicles(vehRes.data.data);
      } catch (err) { console.error("Sync Error", err); }
    };
    fetchOptions();
  }, []);

  const onQuickPing = async (data) => {
    try {
      const response = await api.post('/pings', data);
      if (response.data.success) {
        setStatusMsg({ type: 'success', text: 'Transmission Successful' });
        reset();
        setSelectedUnitLabel("Identify Unit...");
        setSelectedLocLabel("Identify Location...");
        setValue('vehicle_id', ''); // Clear form values
        setValue('location_id', '');
        setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setStatusMsg({ type: 'error', text: error.response?.data?.message || "Auth Required" });
    }
  };

  return (
    <section className="w-full max-w-[1440px] px-[170px] py-20 flex flex-col items-center mx-auto">
      <header className="w-full mb-10 text-left px-2">
        <h2 className="font-body font-bold text-[64px] text-[#1e1e1e] tracking-tight leading-none uppercase tracking-tighter">Campus Hub</h2>
        <p className="text-[24px] text-[#757373] font-medium">UP Mindanao Transit Command Center</p>
      </header>

      <div className="grid grid-cols-12 w-full gap-8">
        {/* LIVE FEED */}
        <div className="col-span-8 bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-[28px] text-[#1e1e1e]">Live Unit Feed</h3>
            <Link to="/units" className="text-[#840000] font-bold text-sm uppercase hover:underline">Full Registry →</Link>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 min-h-[190px]">
            {latestPings.map((ping) => (
              <div key={ping.ping_id} className="min-w-[300px] p-8 bg-[#fcfcfc] rounded-[25px] border border-[#dbdbdb] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-mono font-bold text-[22px] text-[#840000]">{ping.vehicle?.plate_number}</span>
                     <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <p className="font-bold text-[18px] text-[#1e1e1e] truncate mb-2">{ping.location?.location_name}</p>
                  <div className="h-[44px] overflow-y-auto no-scrollbar">
                    <p className="text-[14px] text-[#757373] italic leading-tight">{ping.note || "No sighting notes provided"}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#f0f0f0] flex justify-between items-center mt-2">
                  <span className="font-mono text-[12px] font-bold text-[#840000]">
                    {new Date(ping.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* USER INTEL - Fixed Data Mapping */}
        <div className="col-span-4 row-span-2 bg-white border border-[#dbdbdb] rounded-[35px] p-10 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[28px] text-[#1e1e1e] mb-10">User Intel</h3>
            {user ? (
              <div className="space-y-10">
                <div className="text-center p-12 bg-[#fcfcfc] rounded-[30px] border border-[#dbdbdb] relative overflow-hidden">
                  <span className="text-[72px] font-black text-[#4e0000] leading-none relative z-10">{transmissions}</span>
                  <p className="text-[14px] font-bold text-[#757373] uppercase tracking-[0.2em] mt-4 relative z-10">Transmissions</p>
                  <i className="fa-solid fa-satellite-dish absolute -bottom-6 -right-6 text-[120px] opacity-[0.03]"></i>
                </div>
                <div className="px-2 text-left">
                  <div className="flex justify-between text-[14px] font-bold uppercase mb-3">
                    <span className="text-[#757373]">Rank Progress</span>
                    <span className="text-[#840000]">Level {user.level}</span>
                  </div>
                  <div className="w-full h-[15px] bg-[#f2f2f2] rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-[#4e0000] to-[#840000] transition-all duration-1000" style={{ width: `${progress.percentage}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center opacity-30 flex flex-col items-center gap-6 border-2 border-dashed border-gray-200 rounded-[30px]">
                <i className="fa-solid fa-lock text-6xl"></i>
                <p className="text-sm font-bold uppercase tracking-widest text-[#1e1e1e]">Connect to Sync</p>
              </div>
            )}
          </div>
          <Link to={user ? "/dashboard" : "/login"} 
            className="w-full h-[80px] rounded-full text-white font-bold text-[22px] bg-[#4e0000] hover:bg-[#840000] transition-all shadow-xl flex items-center justify-center mt-10">
            {user ? "Dashboard" : "Authorize Link"}
          </Link>
        </div>

        {/* QUICK PING - CUSTOM DROPDOWNS */}
        <div className="col-span-8 bg-white border border-[#dbdbdb] rounded-[35px] p-12 shadow-lg">
          <h3 className="font-bold text-[28px] text-[#1e1e1e] mb-10 px-2 uppercase tracking-tight">Quick Transmission</h3>
          <form onSubmit={handleSubmit(onQuickPing)} className="grid grid-cols-2 gap-10 px-2">
            
            <div className="flex flex-col gap-4 relative" ref={unitRef}>
              <label className="text-[20px] font-bold ml-4 text-[#1e1e1e]">Identify Unit</label>
              <div 
                onClick={() => setIsUnitOpen(!isUnitOpen)}
                className={cn(
                  "w-full h-[80px] px-8 rounded-[25px] border-2 flex items-center justify-between cursor-pointer transition-all bg-white",
                  isUnitOpen ? "border-[#840000]" : "border-[#dbdbdb]"
                )}
              >
                <span className={selectedUnitLabel.includes("Identify") ? "text-gray-400" : "text-[#1e1e1e] font-medium text-[20px]"}>
                  {selectedUnitLabel}
                </span>
                <i className={cn("fa-solid fa-chevron-down text-[#840000] transition-transform", isUnitOpen && "rotate-180")}></i>
              </div>
              {isUnitOpen && (
                <div className="absolute top-[125px] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-[25px] z-50 shadow-2xl overflow-hidden animate-in">
                  <div className="max-h-[250px] overflow-y-auto">
                    {vehicles.map(v => (
                      <div key={v.vehicle_id} onClick={() => {
                        setSelectedUnitLabel(v.plate_number);
                        setValue('vehicle_id', v.vehicle_id.toString());
                        setIsUnitOpen(false);
                      }} className="px-8 py-5 hover:bg-[#840000] hover:text-white cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0">
                        <p className="font-bold">{v.plate_number}</p>
                        <p className="text-sm opacity-80">Body #{v.body_number}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 relative" ref={locRef}>
              <label className="text-[20px] font-bold ml-4 text-[#1e1e1e]">Current Stop</label>
              <div 
                onClick={() => setIsLocOpen(!isLocOpen)}
                className={cn(
                  "w-full h-[80px] px-8 rounded-[25px] border-2 flex items-center justify-between cursor-pointer transition-all bg-white",
                  isLocOpen ? "border-[#840000]" : "border-[#dbdbdb]"
                )}
              >
                <span className={selectedLocLabel.includes("Identify") ? "text-gray-400" : "text-[#1e1e1e] font-medium text-[20px]"}>
                  {selectedLocLabel}
                </span>
                <i className={cn("fa-solid fa-chevron-down text-[#840000] transition-transform", isLocOpen && "rotate-180")}></i>
              </div>
              {isLocOpen && (
                <div className="absolute top-[125px] left-0 w-full bg-white border-2 border-[#dbdbdb] rounded-[25px] z-50 shadow-2xl overflow-hidden animate-in">
                  <div className="max-h-[250px] overflow-y-auto">
                    {locations.map(l => (
                      <div key={l.location_id} onClick={() => {
                        setSelectedLocLabel(l.location_name);
                        setValue('location_id', l.location_id.toString());
                        setIsLocOpen(false);
                      }} className="px-8 py-5 hover:bg-[#840000] hover:text-white cursor-pointer transition-colors border-b border-[#f0f0f0] last:border-0">
                        <p className="font-bold">{l.location_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-2 pt-6">
              {statusMsg.text && <p className={cn("text-lg font-bold mb-6 ml-4 uppercase", statusMsg.type === 'success' ? 'text-green-600' : 'text-red-500')}>{statusMsg.text}</p>}
              <button type="submit" disabled={isSubmitting} 
                className="w-full h-[85px] rounded-full text-white font-bold text-[32px] bg-[#4e0000] hover:bg-[#840000] transition-all shadow-xl active:scale-[0.98]">
                {isSubmitting ? "TRANSMITTING..." : "SUBMIT PING"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BentoHub;