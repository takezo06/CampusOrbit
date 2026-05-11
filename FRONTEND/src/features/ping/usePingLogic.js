import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/utils/api';

const pingSchema = z.object({
    vehicle_id: z.string().min(1, 'Please select a vehicle'),
    location_id: z.string().min(1, 'Please select a location'),
    note: z.string().max(200, 'Note too long').optional(),
});

export const usePingLogic = () => {
    const [locations, setLocations] = useState([]);
    const [vehicles, setVehicles] = useState([]); 
    const [currentTab, setCurrentTab] = useState('ikot');

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(pingSchema),
        defaultValues: { vehicle_id: '', location_id: '', note: '' }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locRes, vehRes] = await Promise.all([
                    api.get('/locations'),
                    api.get('/vehicles')
                ]);
                if (locRes.data.success) setLocations(locRes.data.data);
                if (vehRes.data.success) setVehicles(vehRes.data.data);
            } catch (error) {
                console.error("Data fetch failed:", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
            // Sending as object to match StorePingRequest expectations
            const response = await api.post('/pings', data);
            if (response.data.success) {
                alert("Ping transmitted!");
                window.location.href = '/dashboard';
            }
        } catch (error) {
            alert(error.response?.data?.message || "Transmission failed.");
        }
    };

    // Filter vehicles by the selected tab (ikot or toda)
    const filteredVehicles = vehicles.filter(v => v.vehicle_type.toLowerCase() === currentTab.toLowerCase());

    return {
        currentTab, setCurrentTab, locations, filteredVehicles,
        register, setValue, handleSubmit: handleSubmit(onSubmit),
        errors, isSubmitting, noteCount: watch('note')?.length || 0
    };
};