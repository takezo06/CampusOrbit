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
    title: "Daily Passengers",
    iconClass: "fa-bolt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque\n dolor felis, tincidunt at imperdiet vel, posuere in risus.\n"
    },
    {
    title: "Daily Passengers",
    iconClass: "fa-shield-halved",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque\n dolor felis, tincidunt at imperdiet vel, posuere in risus.\n"
    },
    {
    title: "Daily Passengers",
    iconClass: "fa-location-dot",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque\n dolor felis, tincidunt at imperdiet vel, posuere in risus.\n"
    },
    {
    title: "Daily Passengers",
    iconClass: "fa-clock",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque\n dolor felis, tincidunt at imperdiet vel, posuere in risus.\n"
    }
]);

return {
    navLinks,
    stats,
    features
};
};