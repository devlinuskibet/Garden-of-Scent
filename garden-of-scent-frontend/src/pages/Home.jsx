import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCollection }) => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setFeatured(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <HeroSection />

      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '15px' }}>
            The Essence of Nature
          </p>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)' }}>Featured Blooms</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
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
