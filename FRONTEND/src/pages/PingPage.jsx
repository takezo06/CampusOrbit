import React from 'react';
import { usePingLogic } from '../features/ping/usePingLogic';

const PingPage = () => {
    const { 
        register, 
        handleSubmit, 
        errors, 
        isSubmitting, 
        noteCount, 
        guestName 
    } = usePingLogic();

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Live Ping</h1>
            <p className="text-sm text-gray-500 mb-6">Posting as: {guestName}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Vehicle Selection */}
                <div>
                    <label className="block text-sm font-medium">Vehicle</label>
                    <select 
                        {...register('vehicle_id')} 
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select a Vehicle</option>
                        <option value="1">Ikot Bus (VFK307)</option>
                        <option value="2">TODA Tricycle</option>
                    </select>
                    {errors.vehicle_id && <p className="text-red-500 text-xs">{errors.vehicle_id.message}</p>}
                </div>

                {/* Location Selection */}
                <div>
                    <label className="block text-sm font-medium">Current Location</label>
                    <select 
                        {...register('location_id')} 
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Location</option>
                        <option value="1">Sports Complex</option>
                        <option value="2">Main Gate</option>
                    </select>
                    {errors.location_id && <p className="text-red-500 text-xs">{errors.location_id.message}</p>}
                </div>

                {/* Optional Note */}
                <div>
                    <label className="block text-sm font-medium">Note (Optional)</label>
                    <textarea 
                        {...register('note')} 
                        placeholder="Any updates?"
                        className="w-full border p-2 rounded"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>{noteCount} / 200</span>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded text-white font-bold ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSubmitting ? 'Sending Ping...' : 'Submit Ping'}
                </button>
            </form>
        </div>
    );
};

export default PingPage;