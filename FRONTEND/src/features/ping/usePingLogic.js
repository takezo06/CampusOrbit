import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/utils/api'; // Ensure this path matches your folder structure

const pingSchema = z.object({
    vehicle_id: z.string().min(1, 'Select a vehicle'),
    location_id: z.string().min(1, 'Select a location'),
    destination_id: z.string().optional(),
    note: z.string().max(200, 'Max 200 characters').optional(),
});

export const usePingLogic = () => {
    const [currentTab, setCurrentTab] = useState('ikot'); 
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        const savedName = localStorage.getItem('orbit_guest_name');
        if (savedName) {
            setGuestName(savedName);
        } else {
            const newName = `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
            localStorage.setItem('orbit_guest_name', newName);
            setGuestName(newName);
        }
    }, []);

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(pingSchema),
    });

    const noteContent = watch('note') || '';

    const onSubmit = async (data) => {
        try {
            // Prepare the data for the Laravel backend
            const payload = {
                vehicle_id: parseInt(data.vehicle_id),
                location_id: parseInt(data.location_id),
                status: 'active', // Matching your successful CURL test
                note: data.note || null,
            };

            // This hits http://127.0.0.1:8000/api/pings
            const response = await api.post('/pings', payload);
            
            console.log('Ping Success:', response.data);
            alert('Ping submitted successfully!');
            reset(); // Clear form after success
            
        } catch (error) {
            console.error('Ping error:', error.response?.data);
            const errorMsg = error.response?.data?.message || 'Failed to connect to server.';
            alert(`Error: ${errorMsg}`);
        }
    };

    return {
        currentTab,
        setCurrentTab,
        guestName,
        register,
        handleSubmit: handleSubmit(onSubmit), // Pre-wrapped for the form
        errors,
        isSubmitting,
        noteCount: noteContent.length
    };
};