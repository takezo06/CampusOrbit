import { useState, useEffect } from 'react';
import api from '@/utils/api';

export const useDashboardLogic = () => {
    const [userData, setUserData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [globalStats, setGlobalStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            // Check for token immediately
            const token = localStorage.getItem('orbit_token');
            if (!token) {
                setError("Please log in to view your Command Center.");
                setLoading(false);
                return;
            }
            try {
                // Fetch individually to prevent one 500 error from killing the whole page
                const userRes = await api.get('/auth/me').catch(e => null);
                const statsRes = await api.get('/stats').catch(e => null);
                const dashRes = await api.get('/auth/dashboard').catch(e => null);

                if (userRes?.data?.success) setUserData(userRes.data.data);
                if (statsRes?.data?.success) setGlobalStats(statsRes.data.data);
                if (dashRes?.data?.success) setDashboardData(dashRes.data.data);

                // Only throw error if the core user data failed
                if (!userRes) throw new Error("Primary connection failed.");                

            } catch (err) {
                // Specific logging to help you debug in F12 console
                console.error("Command Center Sync Failed:", err.response?.data || err.message);
                setError("Establishing Connection Failed. Verify server is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const progressPercentage = dashboardData?.level_progress?.percentage || 0;

    return { 
        userData, 
        globalStats, 
        dashboardData, // Contains recent_pings and ping_count
        progressPercentage, 
        loading, 
        error 
    };
};