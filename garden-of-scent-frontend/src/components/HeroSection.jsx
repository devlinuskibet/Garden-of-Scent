import React from 'react';

const HeroSection = () => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0F1A14',
      overflow: 'hidden',
    }}>
      <img
        src="/assets/HomePageImage.png"
        alt="Garden of Scent - Original Luxury Perfumes and Body Mists Kenya"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        style={{
          maxHeight: '80vh',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </section>
  );
};

export default HeroSection;
