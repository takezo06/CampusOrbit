import React from 'react';
import { useHomeLogic } from '../features/home/useHomeLogic';

const HomePage = () => {
const { stats, features } = useHomeLogic();

return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
    
    <nav class="border-b border-border bg-white sticky top-0 z-50">
        <div class="container h-[80px] flex items-center justify-between">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-grad-maroon flex items-center justify-center text-white font-bold text-xs">O</div>
            <span class="font-display font-bold text-xl text-[#840000]">Campus Orbit</span>
        </div>
        <div class="hidden md:flex items-center gap-md text-sm font-bold uppercase tracking-wider">
            <a href="#" class="text-[#840000] border-b-2 border-[#840000] pb-1">Home</a>
            <a href="#" class="text-muted hover:text-text transition-colors">Units</a>
            <a href="#" class="text-muted hover:text-text transition-colors">Ping Now</a>
            <a href="#" class="text-muted hover:text-text transition-colors">About</a>
            <a href="#" class="text-muted hover:text-text transition-colors">News</a>
            <a href="#" class="text-muted hover:text-text transition-colors">Login</a>
        </div>
        <button class="md:hidden p-2 text-text" aria-label="Toggle Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        </div>
    </nav>

    <section class="container py-xl grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
        <div class="flex flex-col gap-md text-left">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight text-gray-900">
            Modern Transit for <br />
            <span class="hero-text-accent">UPMin Campus</span>
        </h1>
        <div class="flex flex-col gap-4 text-muted text-sm md:text-base max-w-xl">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec enim quis mi congue tempus sed at velit.</p>
            <p>Vestibulum at pretium elit, in interdum lorem. Suspendisse lobortis justo ut nisi faucibus, non semper justo ultricies. Vivamus in consequat lorem.</p>
            <p>Pellentesque malesuada libero sem. Morbi felis est, bibendum sed viverra id.</p>
        </div>
        <div class="flex flex-wrap gap-4 mt-2">
            <button class="btn-pill btn-maroon text-sm shadow-sm">View Locations</button>
            <button class="btn-pill bg-white border border-gray-300 text-text hover:bg-gray-50 text-sm shadow-sm">Ping Now</button>
        </div>
        </div>
        <div class="w-full h-64 md:h-96 bg-gray-200 border border-border rounded-2xl flex items-center justify-center p-ratio shadow-inner">
        <span class="text-muted text-sm uppercase tracking-wider">[Hero Illustration Placeholder]</span>
        </div>
    </section>

    <section class="bg-white border-y border-border py-lg">
        <div class="container grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
        {stats.map((stat, i) => (
            <div key={i} class="flex flex-col gap-1 border-r last:border-r-0 border-border px-2">
            <span class="text-3xl md:text-4xl font-bold font-display text-gray-900">{stat.value}</span>
            <span class="text-xs md:text-sm text-muted font-medium whitespace-pre-line">{stat.label}</span>
            </div>
        ))}
        </div>
    </section>

    <section class="container py-xl">
        <div class="text-left mb-lg">
        <h2 class="text-2xl md:text-3xl font-bold font-display text-gray-900">Why Choose Orbit?</h2>
        <div class="w-16 h-1 bg-gradient-to-r from-[#4E0000] to-[#840000] mt-3 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {features.map((feat, i) => (
            <article key={i} class="orbit-card flex flex-col gap-3">
            <div class="w-10 h-10 rounded-xl bg-gray-100 border border-border flex items-center justify-center text-maroon-vibrant">
                <span class="text-xs font-bold font-mono">0{i + 1}</span>
            </div>
            <h3 class="font-display font-bold text-base text-gray-900">{feat.title}</h3>
            <p class="text-xs text-muted leading-relaxed">{feat.description}</p>
            </article>
        ))}
        </div>
    </section>

    </div>
);
};

export default HomePage;