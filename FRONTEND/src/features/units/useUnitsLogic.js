import { useState, useEffect } from 'react';
import api from '@/utils/api'; // Ensure this matches your axios utility path

export const useUnitsLogic = () => {
    const [currentUnitTab, setCurrentUnitTab] = useState('jeep');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transportationUnits, setTransportationUnits] = useState({
        jeep: [],
        tricycle: []
    });

    const fetchUnits = async () => {
        try {
            // This calls the public route you just fixed in api.php
            const response = await api.get('/vehicles');
            
            if (response.data.success) {
                const allVehicles = response.data.data;

                // Sort the flat DB list into the categories used by your UI tabs
                setTransportationUnits({
                    jeep: allVehicles.filter(v => v.vehicle_type === 'ikot'),
                    tricycle: allVehicles.filter(v => v.vehicle_type === 'toda')
    });
            }
        } catch (error) {
            console.error("System Error: Could not sync with transit registry.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return {
        currentUnitTab,
        setCurrentUnitTab,
        transportationUnits,
        selectedVehicle,
        setSelectedVehicle,
        loading,
        refreshRegistry: fetchUnits
    };
};