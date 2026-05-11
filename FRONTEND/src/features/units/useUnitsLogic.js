import { useState } from 'react';

export const useUnitsLogic = () => {
const [currentUnitTab, setCurrentUnitTab] = useState('jeep');
const [selectedVehicle, setSelectedVehicle] = useState(null); // Track the modal state

// Dummy data synced with your Master Guide's dummy values
const [transportationUnits] = useState({
    jeep: [
    { 
        id: "VFK307", 
        driver: "Juan Dela Cruz", 
        lastLandmark: "CHSS (Admin Building)", 
        timestamp: "08:45 A.M.", 
        status: "ACTIVE",
        routeHistory: [
        { landmark: "CHSS (Admin Building)", building: "CSM Building", time: "08:45 A.M." },
        { landmark: "EBL Hall Residence", building: "Dormitory Loop", time: "08:35 A.M." },
        { landmark: "Atrium Plaza", building: "Administration Wing", time: "08:22 A.M." },
        { landmark: "UPMin Main Gate Strip", building: "Access Road Checkpoint", time: "08:10 A.M." }
        ]
    },
    { 
        id: "GAP670", 
        driver: "Amado V. Hernandez", 
        lastLandmark: "CSM Building", 
        timestamp: "08:42 A.M.", 
        status: "ACTIVE",
        routeHistory: [
        { landmark: "CSM Building", building: "Science Complex", time: "08:42 A.M." },
        { landmark: "CHSS (Admin Building)", building: "Humanities Block", time: "08:30 A.M." }
        ]
    }
    ],
    tricycle: [
    { 
        id: "TRIKE-09", 
        driver: "Jose Rizal", 
        lastLandmark: "Atrium Plaza", 
        timestamp: "08:44 A.M.", 
        status: "ACTIVE",
        routeHistory: [{ landmark: "Atrium Plaza", building: "Main Loop", time: "08:44 A.M." }]
    }
    ]
});

return {
    currentUnitTab,
    setCurrentUnitTab,
    transportationUnits,
    selectedVehicle,
    setSelectedVehicle
};
};