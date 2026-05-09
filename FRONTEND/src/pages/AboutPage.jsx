import React, { useState } from 'react';
import { useAboutLogic } from '../features/about/useAboutLogic';
import AboutIdCard from '../components/ui/AboutIdCard';

const AboutPage = () => {
  const { teamData = [] } = useAboutLogic() || {};
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full flex flex-col items-center bg-[#fcfcfc] min-h-screen font-body overflow-x-hidden">
      <header className="w-full h-[100px] flex flex-col items-center justify-center text-center px-10" 
              style={{ background: 'var(--grad-maroon)' }}>
        <h1 className="font-display font-bold text-5xl text-white tracking-tight">About Us</h1>
      </header>

      {/* RESPONSIBLE CONTAINER: 
         max-w-full ensures it never leaves the screen.
         flex-1 allows it to take up available space.
      */}
      <section className="w-full max-w-[100vw] flex flex-col items-center justify-center py-20 overflow-hidden">
        
        {/* THE SCALING WINDOW:
           We use a scale factor based on the container width. 
        */}
        <div className="relative w-full flex items-center justify-center h-[600px]">
          <div className="id-deck-responsive-scaler">
            <div className="flex flex-row justify-center items-center -space-x-[500px]">
              {teamData.map((member, index) => (
                <div 
                  key={member.id || index} 
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="id-card-wrapper transition-all duration-500 ease-out"
                  style={{ 
                    zIndex: hoveredIndex === index ? 999 : index,
                    transform: `
                      rotate(${ (index - (teamData.length - 1) / 2) * 2 }deg) 
                      translateY(${ hoveredIndex === index ? '-60px' : '0px' })
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
                    extraInfo={`CORE_REG // ${member.joinDate || '2026'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center max-w-xl text-gray-400 text-sm italic px-4">
          <p>The Orbit Core operates as a decentralized unit of developers and designers.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;