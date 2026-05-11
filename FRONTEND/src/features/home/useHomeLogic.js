import { useState, useEffect } from 'react';
import api from '@/utils/api';

export const useHomeLogic = () => {
    const [stats, setStats] = useState([]);
    const [allLatestPings, setAllLatestPings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Stats might fail if not logged in (since it's protected in api.php)
            // Pings will succeed because we made it public above
            const [statsRes, pingsRes] = await Promise.all([
                api.get('/stats').catch(() => null), 
                api.get('/pings?limit=5')
            ]);

            if (statsRes && statsRes.data.success) {
                const s = statsRes.data.data;
                setStats([
                    { value: s.daily_passengers + "+", label: "Daily Passengers" },
                    { value: s.active_locations, label: "Active Locations" },
                    { value: s.active_vehicles, label: "Active Jeeps" },
                    { value: s.registered_operators + "+", label: "Registered Operators" }
                ]);
            }

            if (pingsRes.data.success) {
                setAllLatestPings(pingsRes.data.data);
            }
        } catch (error) {
            console.error("Home Data Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const [features] = useState([
        { title: "Real-Time Awareness", iconClass: "fa-bolt", description: "Stay informed with live crowdsourced pings." },
        { title: "Verified Operators", iconClass: "fa-shield-halved", description: "Orbit works with registered campus drivers." },
        { title: "Demand Visibility", iconClass: "fa-location-dot", description: "Signal your location to let drivers know where crowds are." },
        { title: "Save Time", iconClass: "fa-clock", description: "Plan your walks better by checking vehicle frequency." }
    ]);

    return { stats, features, allLatestPings, loading };
};