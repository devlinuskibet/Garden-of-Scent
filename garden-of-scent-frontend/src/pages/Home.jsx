import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = ({ addToCollection }) => {
  const [featured] = useState(products.slice(0, 4));

  return (
    <div className="home-page">
      <HeroSection />

      {/* The "Originality Guarantee" Banner */}
      <div style={{
        background: 'var(--primary)',
        color: '#fff',
        padding: '25px 20px',
        textAlign: 'center',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '15px' }}>
          The Garden's Guarantee: Experience the Purity of Original Global Brands
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>✦</span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>100% Authentic</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>✦</span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>No Imitations</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>✦</span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>No Exceptions</span>
          </div>
        </div>
      </div>

      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '15px' }}>
            The Essence of Nature
          </p>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)' }}>Featured Blooms</h2>
        </div>

        <div className="product-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} addToCollection={addToCollection} />
          ))}
        </div>
      </section>

      <section className="glass reveal" style={{ margin: '0 40px', padding: '120px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '30px', color: 'var(--secondary)' }}>Our Heritage</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 2, marginBottom: '50px' }}>
            Since our inception, Garden of Scent has been dedicated to the art of slow perfumery. 
            We source only the finest botanicals, respecting their natural cycles to capture 
            the true soul of the plant.
          </p>
          <button className="btn btn-outline">Our Full Story</button>
        </div>
      </section>

      <section style={{ padding: '120px 0', textAlign: 'center' }} className="reveal">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '40px' }}>Stay Enlightened</h3>
          <p style={{ opacity: 0.6, marginBottom: '40px' }}>Join our circle to receive exclusive releases and olfactory insights.</p>
          <div className="flex" style={{ gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ flex: 1, padding: '15px', background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff', outline: 'none' }}
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
