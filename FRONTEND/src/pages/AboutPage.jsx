import React, { useState } from 'react';
import { useAboutLogic } from '../features/about/useAboutLogic';
import AboutIdCard from '../components/ui/AboutIdCard';
import { cn } from '../utils/cn';
import orbitLogo from '../assets/smallred.png';

const AboutPage = () => {
  // Defensive destructuring to prevent crashes if hook returns undefined
  const logic = useAboutLogic();
  const teamData = logic?.teamData || [];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    /* Standardized Container and Padding */
    <main className="orbit-container pt-12 pb-20 select-none bg-white min-h-screen">
      
      {/* 1. Standardized Header */}
      <header className="mb-12">
        <h1 className="orbit-h1">The Architects</h1>
        <p className="text-[20px] text-[#757373] mt-4 max-w-[800px] leading-relaxed font-body">
          Meet the developers behind Orbit—a collective of UPMin students dedicated to 
          digitalizing campus transit through crowdsourced data and modern engineering.
        </p>
      </header>

      {/* 2. BACKGROUND STORY SECTION */}
      <section className="mb-20">
        <div className="orbit-card bg-[#fcfcfc] border-dashed border-2">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="font-display font-bold text-[28px] text-[#840000] uppercase tracking-tighter">
                The Genesis of Orbit
              </h2>
              <div className="space-y-4 text-[17px] text-[#1e1e1e] leading-relaxed font-body">
                <p>
                  It started with a common frustration: standing under the heat of the sun, 
                  wondering if an Ikot jeep had already passed or if the TODA line was simply 
                  too long to wait for.
                </p>
                <p>
                  As students, we realized that while campus transport was moving, the 
                  information about it was standing still. We saw an opportunity to bridge this 
                  gap using the power of the community.
                </p>
                <p>
                  Orbit was built to turn every student into a navigator. By crowdsourcing 
                  sighting data, we've transformed the "wait and see" approach into a 
                  data-driven command center for campus mobility.
                </p>
              </div>
            </div>
            {/* Visual Accent from Design System */}
            <div className="hidden md:flex w-[200px] h-[200px] bg-[#840000]/5 rounded-[var(--card-radius)] items-center justify-center border border-[#840000]/10">
              <img src={orbitLogo} alt="Orbit Logo" className="w-25 h-25 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAN-STYLE ID DECK */}
      <section className="w-full flex flex-col items-center justify-center py-20 overflow-hidden relative min-h-[600px]">
        <div className="id-deck-responsive-scaler">
          <div className="flex flex-row justify-center items-center -space-x-[550px]">
            {teamData.map((member, index) => (
              <div 
                key={member.id || index} 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="id-card-wrapper transition-all duration-500 ease-out"
                style={{ 
                  zIndex: hoveredIndex === index ? 100 : index,
                  transform: `
                    rotate(${ (index - (teamData.length - 1) / 2) * 3 }deg) 
                    translateY(${ hoveredIndex === index ? '-80px' : '0px' })
                    scale(${ hoveredIndex === index ? '1.05' : '1' })
                  `,
                }}
              >
                <AboutIdCard 
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  photo={member.photo}
                  socials={member.socials}
                  extraInfo={member.studentId || `CORE_REG // ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION FOOTER */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#dbdbdb] pt-20">
        <div>
            <h2 className="text-[32px] font-bold text-[#840000] font-display mb-6">Our Mission</h2>
            <p className="text-[#757373] leading-relaxed text-[18px] font-body">
                Orbit was conceived to bridge the gap between students and campus transport. 
                By providing a platform for real-time sightings, we aim to foster a 
                more connected UPMin community.
            </p>
        </div>
        <div className="orbit-card bg-gray-50 flex flex-col justify-center items-center">
            <h3 className="font-bold text-[18px] text-[#1e1e1e] mb-2 uppercase tracking-widest">Version 1.0.4</h3>
            <p className="text-gray-400 font-mono text-sm tracking-tighter">C_ORBIT_REVISION_CMD_HUB</p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;