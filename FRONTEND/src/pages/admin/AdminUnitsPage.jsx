import React, { useState } from 'react';
import './Admin.css'; 
import { useAdminUnitsLogic } from '../../features/admin/useAdminUnitsLogic';

const AdminUnitsPage = () => {
    const { units, loading, addUnit, toggleStatus, deleteUnit, updateUnit } = useAdminUnitsLogic();
    const [filter, setFilter] = useState('all');
    const [modalConfig, setModalConfig] = useState({ show: false, mode: 'create', data: null });
    const [formData, setFormData] = useState({ plate_number: '', body_number: '', vehicle_type: 'ikot' });

    const openModal = (mode, unit = null) => {
        setModalConfig({ show: true, mode, data: unit });
        setFormData(unit ? { ...unit } : { plate_number: '', body_number: '', vehicle_type: 'ikot' });
    };

    // Filter logic
    const filteredUnits = units.filter(u => filter === 'all' || u.vehicle_type === filter);

    if (loading) return <div className="p-20 text-center font-mono animate-pulse text-maroon-main">RETRIVING_FLEET_DATA...</div>;

    return (
        <div className="w-full min-h-screen bg-[#fcfcfc] p-6 md:p-16">
            <div className="max-w-[1440px] mx-auto">
                <header className="mb-10 border-l-4 border-[#840000] pl-6">
                    <h1 className="font-display font-bold text-5xl text-[#4e0000] mb-4">Fleet Management</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 mt-6">
                        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                            {['all', 'ikot', 'toda'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`admin-toggle-btn px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest ${filter === type ? 'active' : ''}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => openModal('create')} className="admin-btn-primary px-8 py-3 rounded-xl font-bold text-xs shadow-lg">
                            + REGISTER NEW UNIT
                        </button>
                    </div>
                </header>

                {/* RESTORED GRID LOGIC */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredUnits.map((unit) => (
                        <div key={unit.vehicle_id} className={`bg-white border rounded-[2rem] p-8 transition-all ${unit.is_active ? 'border-gray-100 shadow-sm' : 'opacity-50 grayscale'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${unit.vehicle_type === 'ikot' ? 'bg-maroon-main/10 text-maroon-main' : 'bg-green-600/10 text-green-600'}`}>
                                    {unit.vehicle_type}
                                </span>
                                <div className={`w-2.5 h-2.5 rounded-full ${unit.is_active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}></div>
                            </div>

                            <h3 className="font-display font-bold text-3xl text-maroon-dark">{unit.plate_number}</h3>
                            <p className="font-mono text-gray-400 text-sm uppercase tracking-tighter mb-8">Body #{unit.body_number}</p>

                            <div className="flex gap-2 border-t border-gray-50 pt-6">
                                <button onClick={() => openModal('edit', unit)} className="flex-1 py-3 admin-btn-secondary text-[10px] font-bold uppercase rounded-xl">Edit</button>
                                <button onClick={() => toggleStatus(unit.vehicle_id)} className="flex-1 py-3 admin-btn-secondary text-[10px] font-bold uppercase rounded-xl">{unit.is_active ? 'Off' : 'On'}</button>
                                <button onClick={() => deleteUnit(unit.vehicle_id)} className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase hover:bg-red-100 transition-colors">Del</button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUnits.length === 0 && (
                    <div className="py-40 text-center font-mono text-gray-300 uppercase tracking-widest">No matching units found in registry.</div>
                )}
            </div>

            {/* MODAL REMAINS THE SAME AS YOUR PREVIOUS FILE */}
            {modalConfig.show && (
                <div className="admin-modal-overlay fixed inset-0 flex items-center justify-center z-[1000] p-4">
                    <div className="admin-card-registry rounded-[2rem] overflow-hidden flex" style={{ width: '850px', height: '520px' }}>
                        <div className="w-[300px] bg-[#4e0000] flex flex-col items-center justify-center p-12 text-white text-center">
                             <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6">
                                <i className={`fa-solid ${formData.vehicle_type === 'ikot' ? 'fa-bus' : 'fa-motorcycle'} text-4xl`}></i>
                             </div>
                             <h2 className="text-2xl font-bold uppercase tracking-tight">{modalConfig.mode}</h2>
                             <p className="opacity-50 text-[10px] font-mono tracking-widest mt-2">REGISTRY_CORE</p>
                        </div>

                        <form className="flex-1 p-16 flex flex-col justify-center bg-white" onSubmit={(e) => {
                            e.preventDefault();
                            if (modalConfig.mode === 'create') addUnit(formData);
                            else updateUnit(modalConfig.data.vehicle_id, formData);
                            setModalConfig({ show: false });
                        }}>
                            <div className="space-y-8">
                                <div className="border-b border-gray-100 pb-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plate Number</label>
                                    <input 
                                        className="w-full text-3xl font-bold text-[#4e0000] outline-none"
                                        value={formData.plate_number}
                                        onChange={(e) => setFormData({...formData, plate_number: e.target.value.toUpperCase()})}
                                        required
                                    />
                                </div>
                                <div className="border-b border-gray-100 pb-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Body Number</label>
                                    <input 
                                        className="w-full text-3xl font-bold text-[#4e0000] outline-none"
                                        value={formData.body_number}
                                        onChange={(e) => setFormData({...formData, body_number: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    {['ikot', 'toda'].map(type => (
                                        <button 
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({...formData, vehicle_type: type})}
                                            className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-widest transition-all ${formData.vehicle_type === type ? 'admin-btn-primary border-[#840000]' : 'admin-btn-secondary border-gray-100'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 flex gap-4">
                                <button type="button" onClick={() => setModalConfig({show: false})} className="admin-btn-secondary flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest">Abort</button>
                                <button type="submit" className="admin-btn-primary flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-maroon-main/20">Commit Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUnitsPage;