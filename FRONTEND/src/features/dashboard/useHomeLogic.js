import { useState } from 'react';

export const useHomeLogic = () => {
    // Exact layout array data extracted from wireframe items 12 through 17
    const [stats] = useState([
        { value: "100+", label: "Daily Passengers" },
        { value: "8", label: "Active\nLocations" },
        { value: "4", label: "Active Jeeps" },
        { value: "20+", label: "Registered\nTODA Operators" }
    ]);

    // Exact duplication block mapping elements from wireframe entries 19 through 26
const [features] = useState([
        {
        title: "Daily Passengers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor felis, tincidunt at imperdiet vel, posuere in risus."
        },
        {
        title: "Daily Passengers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor felis, tincidunt at imperdiet vel, posuere in risus."
        },
        {
        title: "Daily Passengers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor felis, tincidunt at imperdiet vel, posuere in risus."
        },
        {
        title: "Daily Passengers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor felis, tincidunt at imperdiet vel, posuere in risus."
        }
    ]);

return {
        stats,
        features
    };
};