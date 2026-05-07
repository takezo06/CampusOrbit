import { useState } from 'react';

export const useHomeLogic = () => {
const [navLinks] = useState([
    { label: "Home", path: "/", isActive: true },
    { label: "Units", path: "/units", isActive: false },
    { label: "Ping Now", path: "/ping", isActive: false },
    { label: "About", path: "/about", isActive: false },
    { label: "Dashboard", path: "/dashboard", isActive: false }
]);

const [stats] = useState([
    { value: "100+", label: "Daily Passengers" },
    { value: "8", label: "Active\nLocations" },
    { value: "4", label: "Active Jeeps" },
    { value: "20+", label: "Registered\nTODA Operators" }
]);

// Maps direct layout variables to child elements alongside raw FontAwesome classes
const [features] = useState([
    {
    title: "Real-Time Awareness",
    iconClass: "fa-bolt",
    description: "Stay informed with live crowdsourced pings. Know exactly where the Ikot and TODA units are located on campus based on recent sightings from fellow passengers.\n"
    },
    {
    title: "Verified Operators",
    iconClass: "fa-shield-halved",
    description: "Travel with peace of mind. Orbit works with registered campus drivers, ensuring that every unit you track is an official part of the UPMin transit network.\n"
    },
    {
    title: "Demand Visibility",
    iconClass: "fa-location-dot",
    description: "Don't be an invisible passenger. By signaling your location, you let drivers know where crowds are building, helping them prioritize stops where the need is highest.\n"
    },
    {
    title: "Save Time",
    iconClass: "fa-clock",
    description: "Eliminate the guesswork of your daily commute. Plan your walks between buildings better by checking vehicle frequency and reducing unnecessary waiting time at stops.\n"
    }
]);

return {
    navLinks,
    stats,
    features
};
};