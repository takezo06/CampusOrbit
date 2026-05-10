import React from 'react';
import { useAdminPingsLogic } from '../../features/admin/useAdminPingsLogic';

/**
 * AdminPingsPage
 * Displays a detailed audit log of all vehicle pings.
 * Accessible only by users with the 'admin' role.
 */
const AdminPingsPage = () => {
    const { pings, loading, error } = useAdminPingsLogic();

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-maroon-main border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">Retrieving Audit Logs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#fcfcfc]">
                <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-center max-w-md">
                    <h2 className="text-red-600 font-bold mb-2">System Error</h2>
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#fcfcfc] p-6 md:p-16 font-body">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Header Section */}
                <header className="mb-12 border-l-4 border-[#840000] pl-6">
                    <h1 className="font-display font-bold text-5xl text-[#4e0000] mb-2">Ping Audit Log</h1>
                    <div className="flex items-center gap-4">
                        <span className="bg-[#840000]/10 text-[#840000] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                            Admin Access
                        </span>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
                            Total Records: {pings.length}
                        </p>
                    </div>
                </header>

                {/* Table Container */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sighter</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Notes</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {pings.map((ping) => (
                                    <tr key={ping.ping_id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4e0000]">@{ping.user?.username || 'unknown_user'}</span>
                                                <span className="text-[11px] text-gray-400">{ping.user?.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                    ping.vehicle?.vehicle_type === 'ikot' ? 'bg-maroon-main/10 text-maroon-main' : 'bg-green-600/10 text-green-600'
                                                }`}>
                                                    {ping.vehicle?.vehicle_type || 'N/A'}
                                                </span>
                                                <span className="font-mono font-bold text-sm tracking-tight">
                                                    {ping.vehicle?.plate_number || '---'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-medium text-gray-600">
                                                {ping.location?.location_name || 'Generic Location'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm italic text-gray-400 max-w-[200px] truncate">
                                                {ping.note ? `"${ping.note}"` : "No additional data recorded."}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="text-xs font-mono text-gray-400 group-hover:text-maroon-main transition-colors">
                                                {new Date(ping.timestamp).toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {pings.length === 0 && (
                        <div className="p-20 text-center border-t border-gray-50">
                            <p className="text-gray-300 font-mono text-sm uppercase">No ping logs available in registry.</p>
                        </div>
                    )}
                </div>

                <footer className="mt-8 flex justify-between items-center text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                    <span>Authorized Personnel Only</span>
                    <span>CampusOrbit Core // v1.0.4</span>
                </footer>
            </div>
        </div>
    );
};

export default AdminPingsPage;