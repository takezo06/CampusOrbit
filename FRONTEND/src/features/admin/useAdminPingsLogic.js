import { useState, useEffect } from 'react';

export const useAdminPingsLogic = () => {
    const [pings, setPings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // COMMENT OUT the actual fetch logic for now since the backend isn't ready
        /*
        const fetchAuditLogs = async () => {
            const token = localStorage.getItem('auth_token');
            try {
                const response = await fetch('http://localhost:8000/api/admin/pings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Unauthorized Access to Audit Logs');
                const data = await response.json();
                setPings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAuditLogs();
        */

        // USE MOCK DATA INSTEAD (Matches your SQL schema)
        const simulateApiCall = () => {
            const mockData = [
                {
                    ping_id: 1,
                    user: { username: 'josh', email: 'josh@up.edu.ph' }, // Admin in SQL
                    vehicle: { plate_number: 'VFK307', vehicle_type: 'ikot' }, // Vehicle ID 1
                    location: { location_name: 'Sports Complex' }, // Location ID 1
                    note: 'Sighted near gym.',
                    timestamp: '2026-05-11T05:30:00Z'
                },
                {
                    ping_id: 2,
                    user: { username: 'jed', email: 'jed@up.edu.ph' }, // Admin in SQL
                    vehicle: { plate_number: 'GAP670', vehicle_type: 'ikot' }, // Vehicle ID 2
                    location: { location_name: 'CSM' }, // Location ID 2
                    note: 'Full capacity.',
                    timestamp: '2026-05-11T05:35:00Z'
                },
                {
                    ping_id: 3,
                    user: { username: 'student_alpha', email: 'alpha@up.edu.ph' }, // Passenger in SQL
                    vehicle: { plate_number: 'ABX123', vehicle_type: 'toda' }, // Vehicle ID 3
                    location: { location_name: 'Mintal' }, // Location ID 8
                    note: 'Waiting for passengers.',
                    timestamp: '2026-05-11T05:40:00Z'
                }
            ];

            setPings(mockData);
            setLoading(false);
        };

        const timer = setTimeout(simulateApiCall, 1000); // Simulate 1s network delay
        return () => clearTimeout(timer);
    }, []);

    return { pings, loading, error };
};