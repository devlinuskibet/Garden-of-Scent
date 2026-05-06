import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-container" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Background image with Ken Burns + parallax */}
      <div 
        className="ken-burns" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url("/assets/HomePageImage.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }} 
      />

      {/* Dark gradient overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(15,26,20,0.55) 0%, rgba(15,26,20,0.75) 50%, rgba(15,26,20,0.9) 100%)',
        zIndex: 0,
      }} />
      
      <div className="flex-center" style={{ position: 'relative', height: '100%', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
        <div style={{ maxWidth: '900px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '20px' }}>
            Nairobi's Home of Original Fragrances
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '25px', color: '#fff', lineHeight: 1.1 }}>
            Defining Kenyan Luxury,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>One Note at a Time.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '550px', margin: '0 auto 45px', lineHeight: 1.8 }}>
            Authentic designer perfumes, Arabian oud, and luxury body mists — delivered across Kenya.
          </p>
          <div className="flex-center" style={{ gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary">Discover the Collection</Link>
            <Link to="/about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Our Story</Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
        <div style={{ width: '1px', height: '60px', background: '#fff' }} />
      </div>
    </section>
  );
};

export default HeroSection;

