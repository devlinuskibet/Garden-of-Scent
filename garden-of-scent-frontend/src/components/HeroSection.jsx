import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-container" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <div 
        className="ken-burns" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url("/images/hero.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }} 
      />
      
      <div className="flex-center" style={{ position: 'relative', height: '100%', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '30px', color: '#fff', fontStyle: 'italic' }}>
            A Symphony of Botanicals
          </h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '40px' }}>
            Captured in Glass. Defined by Nature.
          </p>
          <div className="flex-center" style={{ gap: '20px' }}>
            <button className="btn btn-primary">Discover the Collection</button>
            <button className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Our Story</button>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
        <div style={{ width: '1px', height: '60px', background: '#fff' }} />
      </div>
    </section>
  );
};

export default HeroSection;
