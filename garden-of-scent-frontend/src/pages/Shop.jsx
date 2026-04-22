import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SCENT_FAMILIES = ['All', 'Floral', 'Woody', 'Fresh', 'Oriental', 'Citrus'];

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFamily, setActiveFamily] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/products${location.search}`;
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
          setAllProducts(data);
        } else {
          setProducts([]);
          setAllProducts([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleFamilyFilter = (family) => {
    setActiveFamily(family);
    if (family === 'All') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(p => p.scent_family === family));
    }
  };

  const isFiltered = !!location.search;

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
      {/* Page Header */}
      <header style={{
        background: 'linear-gradient(180deg, rgba(15,26,20,0.95) 0%, var(--background) 100%)',
        padding: '80px 0 60px',
        textAlign: 'center',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container">
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '15px' }}>
            The Collection
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            {isFiltered ? 'Your Curated Selection' : 'The Boutique'}
          </h1>
          <p style={{ opacity: 0.6, fontSize: '1rem', letterSpacing: '1px' }}>
            {isFiltered ? 'Fragrances matched to your olfactory profile' : 'Explore our complete botanical collection'}
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
        {/* Category Filter Bar — only show when not from Scent Finder */}
        {!isFiltered && (
          <div className="flex-center" style={{ gap: '15px', flexWrap: 'wrap', marginBottom: '60px' }}>
            {SCENT_FAMILIES.map(family => (
              <button
                key={family}
                onClick={() => handleFamilyFilter(family)}
                style={{
                  padding: '10px 24px',
                  fontSize: '0.75rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: activeFamily === family ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                  color: activeFamily === family ? '#000' : 'var(--text)',
                  background: activeFamily === family ? 'var(--secondary)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '2px',
                }}
              >
                {family}
              </button>
            ))}
          </div>
        )}

        {isFiltered && (
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <a href="/shop" style={{ color: 'var(--secondary)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid var(--secondary)', paddingBottom: '2px' }}>
              ← View All Fragrances
            </a>
          </div>
        )}

        {loading ? (
          <div className="flex-center" style={{ height: '400px' }}>
            <p style={{ letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.4, fontSize: '0.8rem' }}>Seeking essence...</p>
          </div>
        ) : (!Array.isArray(products) || products.length === 0) ? (
          <div className="flex-center" style={{ height: '400px', flexDirection: 'column', textAlign: 'center', gap: '30px' }}>
            <p style={{ opacity: 0.5, fontSize: '1.1rem' }}>No fragrances matched this profile.</p>
            <a href="/shop" className="btn btn-outline">View All Scents</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
