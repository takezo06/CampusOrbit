import { useState } from 'react';

export const useAboutLogic = () => {
const [navLinks] = useState([
    { label: "Home", path: "/", isActive: false },
    { label: "Units", path: "/units", isActive: false },
    { label: "Ping Now", path: "/ping", isActive: false },
    { label: "About", path: "/about", isActive: true },
    { label: "News", path: "/news", isActive: false }
]);

const [mainDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
    "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
    "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
    "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
);

// Maps the strict typographical and layout constraints from your figma specs
const [teamMembers] = useState([
    {
    name: "Jed",
    nameSize: "130px", // Giant text target specified for Jed's block in the JSON tree
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
        "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
        "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
        "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
    },
    {
    name: "Zach",
    nameSize: "95px", // Regular title text target specified for Zach's block in the JSON tree
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
        "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
        "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
        "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
    },
    {
    name: "Josh",
    nameSize: "95px", // Regular title text target specified for Josh's block in the JSON tree
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
        "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
        "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
        "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id."
    }
]);

return {
    navLinks,
    mainDescription,
    teamMembers
};
};