import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { products as staticProducts } from '../data/products';

const Shop = ({ addToCollection }) => {
  const [products, setProducts] = useState(staticProducts);
  const [allProducts, setAllProducts] = useState(staticProducts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubBrand, setActiveSubBrand] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const vibe = searchParams.get('vibe');
      const intensity = searchParams.get('intensity');
      const occasion = searchParams.get('occasion');
      const scent_family = searchParams.get('scent_family');

      let filtered = staticProducts;
      if (vibe) filtered = filtered.filter(p => p.vibe_tag === vibe);
      if (intensity) filtered = filtered.filter(p => p.intensity === intensity);
      if (occasion) filtered = filtered.filter(p => p.occasion === occasion);
      if (scent_family) filtered = filtered.filter(p => p.scent_family === scent_family);

      setProducts(filtered);
      setAllProducts(filtered);
    } else {
      setProducts(staticProducts);
      setAllProducts(staticProducts);
    }
  }, [location.search]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubBrand('All');
    if (cat === 'All') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(p => p.category === cat));
    }
  };

  const handleSubBrandChange = (brand) => {
    setActiveSubBrand(brand);
    if (brand === 'All') {
      setProducts(allProducts.filter(p => p.category === 'Luxury Perfumes'));
    } else {
      setProducts(allProducts.filter(p => p.category === 'Luxury Perfumes' && p.brand?.toLowerCase() === brand.toLowerCase()));
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
            {isFiltered ? 'Your Curated Selection' : 'Our Fragrance Collection'}
          </h1>
          <p style={{ opacity: 0.6, fontSize: '1rem', letterSpacing: '1px' }}>
            {isFiltered ? 'Fragrances matched to your olfactory profile' : 'Explore our complete botanical collection'}
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
        {/* Category Filter Bar — only show when not from Scent Finder */}
        {!isFiltered && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: activeCategory === 'Luxury Perfumes' ? '20px' : '60px', flexWrap: 'wrap' }}>
            {['All', 'Body Mists & Care', 'Luxury Perfumes'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat ? '2px solid var(--secondary)' : '2px solid transparent',
                  padding: '10px 0',
                  color: activeCategory === cat ? 'var(--secondary)' : 'var(--text)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontSize: '0.9rem',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Sub Filter for Luxury Perfumes */}
        {!isFiltered && activeCategory === 'Luxury Perfumes' && (
          <div className="filter-container" style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '60px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: '15px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--secondary) transparent'
          }}>
            <style>{`
              .filter-container::-webkit-scrollbar { height: 2px; }
              .filter-container::-webkit-scrollbar-track { background: transparent; }
              .filter-container::-webkit-scrollbar-thumb { background: var(--secondary); }
            `}</style>
            {['All', ...new Set(allProducts.filter(p => p.category === 'Luxury Perfumes').map(p => p.brand).filter(Boolean))].map(brand => (
              <button
                key={brand}
                onClick={() => handleSubBrandChange(brand)}
                style={{
                  padding: '6px 16px',
                  fontSize: '0.7rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: activeSubBrand === brand ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                  color: activeSubBrand === brand ? '#000' : 'var(--text)',
                  background: activeSubBrand === brand ? 'var(--secondary)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '2px',
                  flexShrink: 0
                }}
              >
                {brand}
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

        {(!Array.isArray(products) || products.length === 0) ? (
          <div className="flex-center" style={{ height: '400px', flexDirection: 'column', textAlign: 'center', gap: '30px' }}>
            <p style={{ opacity: 0.5, fontSize: '1.1rem' }}>No fragrances matched this profile.</p>
            <a href="/shop" className="btn btn-outline">View All Scents</a>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} addToCollection={addToCollection} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
