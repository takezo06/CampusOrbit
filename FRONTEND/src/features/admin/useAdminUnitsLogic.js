import { useState, useEffect } from 'react';

export const useAdminUnitsLogic = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial fetch (Mocked for now)
    useEffect(() => {
        const simulateFetch = () => {
            // Based on your database schema
            const mockUnits = [
                { vehicle_id: 1, plate_number: 'VFK307', body_number: '01', vehicle_type: 'ikot', is_active: 1 },
                { vehicle_id: 2, plate_number: 'GAP670', body_number: '02', vehicle_type: 'ikot', is_active: 1 },
                { vehicle_id: 3, plate_number: 'ABX123', body_number: 'T1', vehicle_type: 'toda', is_active: 1 },
                { vehicle_id: 4, plate_number: 'TDA456', body_number: 'T2', vehicle_type: 'toda', is_active: 0 }
            ];
            setUnits(mockUnits);
            setLoading(false);
        };
        setTimeout(simulateFetch, 800);
    }, []);

    // Create Operation
    const addUnit = (newUnit) => {
        const unitWithId = { ...newUnit, vehicle_id: Date.now(), is_active: 1 };
        setUnits([...units, unitWithId]);
        console.log("Registry Update: Unit added to local state.");
    };

    // Update Operation (Toggle Status)
    const toggleStatus = (id) => {
        setUnits(units.map(u => 
            u.vehicle_id === id ? { ...u, is_active: u.is_active === 1 ? 0 : 1 } : u
        ));
    };

    // Delete Operation
    const deleteUnit = (id) => {
        if(window.confirm("Are you sure you want to decommission this unit?")) {
            setUnits(units.filter(u => u.vehicle_id !== id));
        }
    };

    // Update Operation (General)
    const updateUnit = (id, updatedData) => {
        setUnits(prev => prev.map(u => u.vehicle_id === id ? { ...u, ...updatedData } : u));
        console.log(`Log: Unit ${id} has been modified in registry.`);
    };

    return { units, loading, error, addUnit, toggleStatus, deleteUnit, updateUnit };
};