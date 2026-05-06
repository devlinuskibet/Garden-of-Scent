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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 'calc(12vh + 100px)', // Shift everything UP 100px
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

      {/* Typography Block */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '90%',
          animation: 'slideUpFade 1.2s ease forwards',
          animationDelay: '0.8s',
          opacity: 0,
          marginBottom: '2rem', // Spacing before the buttons
        }}
      >
        {/* Layer 1: Primary Heading (Tagline) */}
        <h1 
          className="hero-tagline"
          style={{
            color: '#F5E6BE',
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Defining Kenyan Luxury, One Note at a Time.
        </h1>

        {/* Layer 2: Secondary Subheading */}
        <p
          style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 500,
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Nairobi’s Destination for Original Luxury Perfumes.
        </p>
      </div>

      {/* Interactive Layer (Bottom) */}
      <div 
        className="hero-buttons reveal active"
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Link 
          to="/shop" 
          className="btn btn-primary btn-glow"
          style={{ backgroundColor: '#B8860B', color: '#fff', border: 'none' }}
        >
          Explore Collection
        </Link>
        <Link 
          to="/about" 
          className="btn btn-outline btn-glow-outline"
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(5px)', 
            border: '1px solid #D4AF37',
            color: '#D4AF37'
          }}
        >
          Our Heritage
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
