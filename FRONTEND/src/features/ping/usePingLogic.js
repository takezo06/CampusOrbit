import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const pingSchema = z.object({
vehicle_id: z.string().min(1, 'Select a vehicle'),
location_id: z.string().min(1, 'Select a location'),
destination_id: z.string().optional(),
note: z.string().max(200, 'Max 200 characters').optional(),
});

export const usePingLogic = () => {
const [currentTab, setCurrentTab] = useState('ikot'); // 'ikot' or 'toda'
const [guestName, setGuestName] = useState('');

// Generate a guest name like "Guest-4291" on mount
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

const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(pingSchema),
});

const noteContent = watch('note') || '';

const onSubmit = async (data) => {
    // Send to POST /pings
    // Backend will capture IP via $request->ip()
    console.log('Ping Sent by:', guestName, data);
};

return {
    currentTab,
    setCurrentTab,
    guestName,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    noteCount: noteContent.length
};
};