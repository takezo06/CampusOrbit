import { useState } from 'react';

export const useUnitsLogic = () => {
const [currentUnitTab, setCurrentUnitTab] = useState('jeep');
const [selectedVehicleTrack, setSelectedVehicleTrack] = useState(null);

const [navLinks] = useState([
    { label: "Home", path: "/", isActive: false },
    { label: "Units", path: "/units", isActive: true },
    { label: "Ping Now", path: "/ping", isActive: false },
    { label: "About", path: "/about", isActive: false },
    { label: "News", path: "/news", isActive: false }
]);

// Nested timeline data blocks attached right to individual vehicle metrics
const [transportationUnits] = useState({
    jeep: [
    { 
        id: "VFK307", 
        driver: "Juan Dela Cruz", 
        lastLandmark: "CHSS (Admin Building)", 
        timestamp: "08:45 A.M.", 
        status: "Active",
        routeHistory: [
        { landmark: "CHSS (Admin Building)", building: "CSM Building", time: "08:45 A.M." },
        { landmark: "CHSS (Admin Building)", building: "CSM Building", time: "08:41 A.M." },
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
        status: "Active",
        routeHistory: [
        { landmark: "CSM Building", building: "Science Complex Main Entrance", time: "08:42 A.M." },
        { landmark: "CHSS (Admin Building)", building: "Humanities Block", time: "08:30 A.M." },
        { landmark: "Atrium Plaza", building: "Administration Wing", time: "08:15 A.M." }
        ]
    }
    ],
    tricycle: [
    { 
        id: "TRIKE-09", 
        driver: "Jose Rizal", 
        lastLandmark: "Atrium Plaza", 
        timestamp: "08:44 A.M.", 
        status: "Active",
        routeHistory: [
        { landmark: "Atrium Plaza", building: "Main Administration Loop", time: "08:44 A.M." },
        { landmark: "Sports Complex Gym", building: "Training Center Entrance", time: "08:30 A.M." }
        ]
    }
    ]
});

return {
    navLinks,
    currentUnitTab,
    setCurrentUnitTab,
    transportationUnits,
    selectedVehicleTrack,
    setSelectedVehicleTrack
};
};