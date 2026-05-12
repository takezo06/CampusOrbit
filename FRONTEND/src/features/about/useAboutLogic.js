import { useState } from 'react';
import jedPhoto from '@/assets/jed.jpg';
import zachPhoto from '@/assets/zach.jpg';
import joshPhoto from '@/assets/josh.jpg';

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
        role: "Frontend & UI/UX Developer",
        bio: "Jed Zephan N. Somera is a Computer Science freshman and AWS Cloud Club Security lead who balances the pursuit of physical hypertrophy with the aggressive debugging of stateless JWT systems. When he isn't simulating multi-bit subtractors or manifesting 'modern brutalist' web layouts, he can be found hydrating with enough electrolytes to survive a segmentation fault. He firmly believes that if your existence isn't documented in a README, you are likely just a collective hallucination or a rogue PostgreSQL query.",
        joinDate: "MAY 2026",
        photo: jedPhoto,
        socials: {
            instagram: "https://www.instagram.com/06_zzz.z/",
            facebook: "https://www.facebook.com/zzz.zephan",
            linkedin: "https://www.linkedin.com/in/jed-somera/",
            github: "https://github.com/takezo06"
        }
    },
    {
        id: 2,
        name: "Zach",
        role: "Backend Developer",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim \n" +
            "quis mi congue tempus sed at velit. Vestibulum at pretium elit, in interdum lorem. \n" +
            "Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in \n" +
            "consequat lorem. Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id.",
        joinDate: "MAY 2026",
        photo: zachPhoto,
        socials: {
            instagram: "https://www.instagram.com/tia.zach/",
            facebook: "https://www.facebook.com/zach.enrico.3",
            linkedin: "https://www.linkedin.com/in/zach-tia-36796737b/",
            github: "https://github.com/zachenricotia-design"
        }
    },
    {
        id: 3,
        name: "Josh",
        role: "Backend Developer",
        bio: "Joshua Papica is a relentlessly curious developer who treats software like a puzzle to dissect and master. He thrives on experimentation, late-night ideas, and pushing systems to their limits. His coding style is chaotic but effective—sometimes unpredictable, often brilliant—and he has a talent for understanding APIs and complex systems faster than most. Behind the humor and “final_final_v3” energy is someone who builds creatively, solves problems instinctively, and is equally dangerous and valuable around production systems.",
        joinDate: "MAY 2026",
        photo: joshPhoto,
        socials: {
            instagram: "https://www.instagram.com/joshuayacob/",
            facebook: "https://www.facebook.com/joshuayacobpapica19",
            linkedin: "https://www.linkedin.com/in/joshuapapica/",
            github: "https://github.com/yacobpapica-oss"
        }
    }
]);

return {
    navLinks,
    mainDescription,
    teamData
};
};