import { useState } from 'react';

export const useAboutLogic = () => {
const [navLinks] = useState([
    { label: "Home", path: "/", isActive: false },
    { label: "Units", path: "/units", isActive: false },
    { label: "Ping Now", path: "/ping", isActive: false },
    { label: "About", path: "/about", isActive: true },
    { label: "Dashboard", path: "/dashboard", isActive: false }
]);

const [mainDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
    "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
    "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
    "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
);

// Maps the strict typographical and layout constraints from your figma specs
const [teamData] = useState([
    {
        id: 1,
        name: "Jed",
        role: "Kupal",
        bio: "Specializing in frontend architecture and systems integration for Campus Orbit.",
        joinDate: "MAY 2026",
        photo: "YOUR_IMAGE_PATH",
        socials: {
            instagram: "#",
            facebook: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        id: 2,
        name: "Zach",
        role: "Frontend Developer",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
            "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
            "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
        "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
    },
    {
        id: 3,
        name: "Josh",
        role: "Backend Developer",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
            "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
            "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
            "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
    }
]);

return {
    navLinks,
    mainDescription,
    teamData
};
};