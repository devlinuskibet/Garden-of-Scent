import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  {
    icon: '❧',
    title: 'Sustainable Sourcing',
    desc: 'Every botanical is ethically harvested from certified farms, respecting the natural cycles of the earth.',
  },
  {
    icon: '⊹',
    title: 'Small Batch Artisanship',
    desc: 'We produce in limited quantities to guarantee complexity, freshness, and exquisite quality in every bottle.',
  },
  {
    icon: '✦',
    title: 'Botanical Purity',
    desc: 'High concentration of raw natural oils — free from synthetic dilutants — for unmatched longevity and clarity.',
  },
];

const TIMELINE = [
  { year: '2018', event: 'Founded in a small Nairobi atelier with three signature blends and a dream of slow perfumery.' },
  { year: '2020', event: 'Expanded sourcing to Bulgarian rose fields, Kenyan cedarwood farms, and Moroccan oud suppliers.' },
  { year: '2022', event: 'Launched our flagship boutique in Westlands, welcoming fragrance lovers across East Africa.' },
  { year: '2024', event: 'Introduced the Scent Finder — our curated sensory guide to help every customer find their signature scent.' },
];

const About = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>

      {/* Cinematic Banner */}
      <section style={{
        height: '70vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', padding: '0 30px' }}>
          <p style={{ color: 'var(--secondary)', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '20px' }}>
            Our Heritage
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.1, marginBottom: '30px', fontStyle: 'italic' }}>
            A Journey in Scent
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Born from a passion for botanical purity and the art of slow perfumery.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--secondary)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '20px' }}>
              The Philosophy
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '30px', lineHeight: 1.2 }}>
              We believe a fragrance is a liquid memory.
            </h2>
            <p style={{ opacity: 0.75, lineHeight: 2, fontSize: '1.05rem', marginBottom: '25px' }}>
              At Garden of Scent, we bypass synthetic fillers to work exclusively with the highest-quality raw botanical ingredients sourced from sustainable, ethical farms across the globe — from the rose valleys of Bulgaria to the cedarwood forests of Kenya.
            </p>
            <p style={{ opacity: 0.75, lineHeight: 2, fontSize: '1.05rem', marginBottom: '40px' }}>
              Every bottle is a testament to the slow art of perfumery — crafted with intention, aged to perfection, and designed to become an indelible part of your personal story. Our luxury lives not in the aesthetic alone, but in the uncompromising quality of the essences we select.
            </p>
            <Link to="/shop" className="btn btn-outline">
              Explore the Collection
            </Link>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="glass" style={{ padding: '12px' }}>
              <img
                src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&q=80&w=900"
                alt="Artisan perfumer at work"
                style={{ width: '100%', height: '550px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              right: '-25px',
              background: 'var(--secondary)',
              color: '#000',
              padding: '25px 30px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              <strong style={{ fontSize: '2.5rem', display: 'block' }}>6+</strong>
              Years of Craft
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'rgba(31, 61, 43, 0.15)', padding: '100px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p style={{ color: 'var(--secondary)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '15px' }}>
              What Guides Us
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {VALUES.map(v => (
              <div key={v.title} className="glass" style={{ padding: '45px 35px' }}>
                <div style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '20px' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>{v.title}</h3>
                <p style={{ opacity: 0.7, lineHeight: 1.9, fontSize: '0.95rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Timeline */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p style={{ color: 'var(--secondary)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '15px' }}>
              Our Journey
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Milestones</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: '40px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '40px', paddingBottom: i < TIMELINE.length - 1 ? '50px' : '0', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-8px', top: 0, width: '15px', height: '15px', background: 'var(--secondary)', borderRadius: '50%' }} />
                <div>
                  <p style={{ color: 'var(--secondary)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '10px' }}>{item.year}</p>
                  <p style={{ opacity: 0.75, lineHeight: 1.8, fontSize: '1rem' }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'rgba(31, 61, 43, 0.2)', borderTop: '1px solid var(--glass-border)', padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '25px' }}>Find Your Signature Scent</h2>
          <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '45px' }}>
            Let our Scent Finder guide you through a curated 3-step journey to your perfect botanical match.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quiz" className="btn btn-primary">Take the Scent Finder ✦</Link>
            <Link to="/contact" className="btn btn-outline">Speak to a Concierge</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
