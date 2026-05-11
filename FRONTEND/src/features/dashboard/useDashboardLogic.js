import { useState, useEffect } from 'react';
import api from '@/utils/api';

export const useDashboardLogic = () => {
    const [data, setData] = useState({ stats: null, user: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            // 1. Try to get the User Profile (This one is working!)
            try {
                const userRes = await api.get('/auth/me');
                if (userRes.data.success) {
                    setData(prev => ({ ...prev, user: userRes.data.data }));
                }
            } catch (e) {
                console.error("User profile failed", e);
            }

            // 2. Try to get Global Stats (This is the one giving 500)
            try {
                const statsRes = await api.get('/stats');
                if (statsRes.data.success) {
                    setData(prev => ({ ...prev, stats: statsRes.data.data }));
                }
            } catch (e) {
                console.error("Stats failed", e);
                // We don't set the global 'error' here so the page doesn't turn red
            }

        } catch (err) {
            setError("Could not sync with Orbit servers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const progressPercentage = data.user ? (data.user.points % 100) : 0;

    return { 
        userData: data.user, 
        globalStats: data.stats,
        progressPercentage, 
        loading, 
        error: data.user ? null : error // Only show error if we can't even get the user
    };
};