import { useState, useEffect } from 'react';
import api from '@/utils/api'; 

export const useHomeLogic = () => {
    const [stats, setStats] = useState([]);
    const [allLatestPings, setAllLatestPings] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Static features content
    const [features] = useState([
        { title: "Real-Time Awareness", iconClass: "fa-bolt", description: "Stay informed with live crowdsourced pings." },
        { title: "Verified Operators", iconClass: "fa-shield-halved", description: "Orbit works with registered campus drivers." },
        { title: "Demand Visibility", iconClass: "fa-location-dot", description: "Signal your location to let drivers know where crowds are." },
        { title: "Save Time", iconClass: "fa-clock", description: "Plan your walks better by checking vehicle frequency." }
    ]);

    const fetchData = async () => {
        try {
            // 1. Fetch Public Data (Stats and Pings)
            const [statsRes, pingsRes] = await Promise.all([
                api.get('/stats').catch(() => null), 
                api.get('/pings?limit=5').catch(() => null)
            ]);

            if (statsRes && statsRes.data?.success) {
                const s = statsRes.data.data;
                setStats([
                    { value: "50+", label: "Daily Passengers" },
                    { value: s.active_locations || 0, label: "Active Locations" },
                    { value: s.active_vehicles || 0, label: "Active Jeeps" },
                    { value: s.registered_operators + "+" || "0+", label: "Registered Operators" }
                ]);
            }

            if (pingsRes && pingsRes.data?.success) {
                setAllLatestPings(pingsRes.data.data);
            }

            // 2. Fetch User-Specific Data if logged in
            const token = localStorage.getItem('orbit_token');
            if (token) {
                try {
                    const userDashRes = await api.get('/auth/dashboard');
                    if (userDashRes.data.success) {
                        setUserData(userDashRes.data.data); 
                    }
                } catch (dashError) {
                    console.error("Dashboard Fetch Failed:", dashError);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }

        } catch (error) {
            console.error("Home Data Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Auto-refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return { stats, features, allLatestPings, userData, loading };
};