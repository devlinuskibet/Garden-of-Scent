import React from 'react';
import { Link } from 'react-router-dom';

const SOURCING = [
  {
    icon: '🗼',
    title: 'Parisian Elegance',
    desc: 'From the ateliers of Paris, we source the world\'s most revered designer houses — Chanel, Dior, YSL, and Givenchy. Each bottle carries the unmistakable refinement of French haute parfumerie.',
    accent: 'France',
  },
  {
    icon: '🕌',
    title: 'Middle Eastern Oud',
    desc: 'The ancient art of Arabian perfumery inspires our boldest selections. Rich oud, amber, and musk from the Middle East bring depth and mystique to our curated collection.',
    accent: 'Arabia',
  },
  {
    icon: '🌿',
    title: 'Kenyan Spirit',
    desc: 'Rooted in Nairobi, we bring global luxury to the Kenyan shopper. Our mission is simple: guarantee authenticity, deliver with care, and make world-class fragrance accessible across East Africa.',
    accent: 'Kenya',
  },
];

const About = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>

      {/* Cinematic Hero */}
      <section style={{
        minHeight: '75vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0F1A14 0%, #1a2e22 50%, #0F1A14 100%)',
      }}>
        {/* Abstract botanical pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--secondary) 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, var(--secondary) 1px, transparent 1px),
                            radial-gradient(circle at 50% 80%, var(--secondary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 80px 80px, 100px 100px',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.05)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '0 30px' }} className="reveal active">
          <p style={{ color: 'var(--secondary)', letterSpacing: '6px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '25px' }}>
            Our Story
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.1, marginBottom: '35px' }}>
            Defining Kenyan Luxury,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>One Note at a Time.</span>
          </h1>
          <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto' }}>
            We believe luxury isn't about labels — it's about the feeling when a scent becomes part of who you are.
            Garden of Scent brings the world's finest fragrances to Kenya, one authentic bottle at a time.
          </p>
        </div>
      </section>

      {/* The Guarantee */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div className="reveal">
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid var(--secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              fontSize: '1.5rem',
            }}>
              ✦
            </div>
            <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '20px' }}>
              Our Promise
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '35px', lineHeight: 1.2 }}>
              The Guarantee
            </h2>
            <p style={{ opacity: 0.8, fontSize: '1.2rem', lineHeight: 2, fontStyle: 'italic', maxWidth: '700px', margin: '0 auto 40px' }}>
              "In a world of imitations, we stand for the original. Every bottle in our garden is a certified authentic masterpiece."
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginTop: '60px',
            }}>
              {[
                { num: '100%', label: 'Authentic Products' },
                { num: '25+', label: 'Premium Brands' },
                { num: '24hr', label: 'Nairobi Delivery' },
              ].map(stat => (
                <div key={stat.label} className="glass" style={{ padding: '35px 20px' }}>
                  <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', marginBottom: '8px' }}>
                    {stat.num}
                  </p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Map — replaces Timeline */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
            <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '15px' }}>
              Where We Source
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Three Worlds, One Garden</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {SOURCING.map((s, i) => (
              <div key={s.title} className="glass reveal" style={{
                padding: '50px 35px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${i * 0.15}s`,
              }}>
                {/* Accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--secondary)',
                }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '25px' }}>{s.icon}</div>
                <p style={{
                  color: 'var(--secondary)',
                  fontSize: '0.65rem',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  {s.accent}
                </p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{s.title}</h3>
                <p style={{ opacity: 0.7, lineHeight: 1.9, fontSize: '0.95rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder CTA */}
      <section className="section-padding" style={{
        background: 'rgba(31, 61, 43, 0.15)',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
      }}>
        <div className="container reveal" style={{ maxWidth: '650px' }}>
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '20px' }}>
            Your Journey Starts Here
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '25px' }}>Find Your Signature Scent</h2>
          <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '45px', fontSize: '1.05rem' }}>
            Not sure where to start? Our interactive Scent Finder matches you with the perfect fragrance based on your vibe, lifestyle, and occasion.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quiz" className="btn btn-primary">Take the Scent Finder ✦</Link>
            <Link to="/contact" className="btn btn-outline">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
