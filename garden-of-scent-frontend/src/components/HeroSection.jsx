import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="hero-container"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end', // Push content to bottom
        justifyContent: 'center',
        paddingBottom: '15vh', // Keep it above the very bottom edge
      }}
    >
      {/* Background Image Layer with Ken Burns Animation */}
      <img
        src="/assets/HomePageImage.png"
        alt="Garden of Scents Luxury Minimalist Logo"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        className="ken-burns"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Interactive Layer */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
        className="reveal active"
      >
        <Link 
          to="/shop" 
          className="btn btn-primary btn-glow"
        >
          Explore Collection
        </Link>
        <Link 
          to="/about" 
          className="btn btn-outline btn-glow-outline"
        >
          Our Heritage
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
