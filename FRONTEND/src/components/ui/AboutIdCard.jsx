import React from 'react';
import './AboutIdCard.css';
import upminLongLogo from '../../assets/upminlong.png'; 
import smallOrbit from '../../assets/smallred.png';

const AboutIdCard = ({ photo, name, role, bio, socials, extraInfo }) => {
  return (
    <article className="orbit-id-card group">
      <img src={smallOrbit} alt="" className="id-watermark" />

      <div className="id-header">
        <img src={upminLongLogo} alt="UP Mindanao" className="id-header-logo" />
      </div>

      <div className="id-body">
        <div className="id-photo-container">
          <img src={photo || 'https://via.placeholder.com/240x300'} alt={name} />
        </div>

        <div className="id-info-track">
          <div className="id-field-group">
            <span className="id-label">NAME</span>
            <span className="id-value-name">{name}</span>
          </div>

          <div className="id-field-group">
            <span className="id-label">DESIGNATION</span>
            <span className="id-value font-display font-bold text-[#840000]">{role}</span>
          </div>

          <div className="id-field-group">
            <span className="id-label">BIONOTE</span>
            <p className="id-bio-text">{bio}</p>
          </div>

          <div className="id-socials-row">
            {socials?.instagram && <a href={socials.instagram} className="id-social-link"><i className="fa-brands fa-instagram"></i></a>}
            {socials?.facebook && <a href={socials.facebook} className="id-social-link"><i className="fa-brands fa-facebook-f"></i></a>}
            {socials?.linkedin && <a href={socials.linkedin} className="id-social-link"><i className="fa-brands fa-linkedin-in"></i></a>}
            {socials?.github && <a href={socials.github} className="id-social-link"><i className="fa-brands fa-github"></i></a>}
          </div>
          
          <div className="mt-2 text-[10px] font-mono text-gray-300">
            REG_ID // {extraInfo}
          </div>
        </div>
      </div>
    </article>
  );
};

export default AboutIdCard;