import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/utils/api';
import { useDashboardLogic } from '../dashboard/useDashboardLogic';

// Removed status from the schema requirement
const pingSchema = z.object({
    vehicle_id: z.string().min(1, 'Please select a vehicle'),
    location_id: z.string().min(1, 'Please select a location'),
    note: z.string().max(200, 'Note too long').optional(),
});

export const usePingLogic = () => {
    const { userData } = useDashboardLogic();
    const [currentTab, setCurrentTab] = useState('ikot');
    const [locations, setLocations] = useState([]);

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(pingSchema),
        defaultValues: { vehicle_id: '', location_id: '', note: '' }
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get('/locations');
                if (response.data.success) {
                    setLocations(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };
        fetchLocations();
    }, []);

    const onSubmit = async (data) => {
        try {
            // Sending exactly what the form provides (no forced status)
            const response = await api.post('/pings', data);
            if (response.data.success) {
                alert("Ping transmitted!");
                window.location.href = '/dashboard';
            }
        } catch (error) {
            // Displays validation errors if the backend is still rejecting it
            alert(error.response?.data?.message || "Transmission failed.");
        }
    };

    return {
        currentTab, setCurrentTab, userData, locations,
        register, setValue, handleSubmit: handleSubmit(onSubmit),
        errors, isSubmitting, noteCount: watch('note')?.length || 0
    };
};