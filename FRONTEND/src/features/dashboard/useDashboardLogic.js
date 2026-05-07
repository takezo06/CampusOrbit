import { useState } from 'react';

export const useDashboardLogic = () => {
// Mock data representing the user's profile
const [userData] = useState({
    name: "Juan Dela Cruz",
    username: "guest-4291",
    level: 12,
    points: 2450,
    pointsToNextLevel: 3000,
    totalPings: 48,
    joinedDate: "May 2026",
    recentActivity: [
    { id: 1, vehicle: "VFK307", landmark: "CHSS Building", time: "2 mins ago", type: "Ikot" },
    { id: 2, vehicle: "GAP670", landmark: "CSM Building", time: "1 hour ago", type: "Ikot" },
    { id: 3, vehicle: "TODA-12", landmark: "Main Gate", time: "3 hours ago", type: "Toda" },
    ]
});

const progressPercentage = (userData.points / userData.pointsToNextLevel) * 100;

return { userData, progressPercentage };
};