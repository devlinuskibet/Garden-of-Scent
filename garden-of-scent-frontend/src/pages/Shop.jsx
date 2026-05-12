import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { products as staticProducts } from '../data/products';

const Shop = ({ addToCollection }) => {
  const [allProducts, setAllProducts] = useState(staticProducts);
  const [displayProducts, setDisplayProducts] = useState(staticProducts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubBrand, setActiveSubBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState('default');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);
  const location = useLocation();

  const isFiltered = !!location.search;

  // Load from URL params (Scent Finder results)
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

      setAllProducts(filtered);
    } else {
      setAllProducts(staticProducts);
    }
  }, [location.search]);

  // Master filter pipeline: category → sub-brand → search → sort
  const applyFilters = useCallback((source, category, subBrand, query, sort) => {
    let result = [...source];

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Sub-brand filter (Luxury Perfumes only)
    if (category === 'Luxury Perfumes' && subBrand !== 'All') {
      result = result.filter(p => p.brand?.toLowerCase() === subBrand.toLowerCase());
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.scent_family && p.scent_family.toLowerCase().includes(q)) ||
        (p.top_notes && p.top_notes.toLowerCase().includes(q)) ||
        (p.heart_notes && p.heart_notes.toLowerCase().includes(q)) ||
        (p.base_notes && p.base_notes.toLowerCase().includes(q)) ||
        (p.vibe_tag && p.vibe_tag.toLowerCase().includes(q))
      );
    }

    // Price sort
    if (sort === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, []);

  // Re-apply filters whenever dependencies change
  useEffect(() => {
    const result = applyFilters(allProducts, activeCategory, activeSubBrand, searchQuery, priceSort);
    setDisplayProducts(result);
  }, [allProducts, activeCategory, activeSubBrand, searchQuery, priceSort, applyFilters]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubBrand('All');
    setSearchQuery('');
    setPriceSort('default');
  };

  const handleSubBrandChange = (brand) => {
    setActiveSubBrand(brand);
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(prev => {
      if (!prev) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      return !prev;
    });
  };

  const categories = ['All', 'Luxury Perfumes', 'Bath & Body Works', 'Body Care'];
  const luxuryBrands = ['All', ...new Set(allProducts.filter(p => p.category === 'Luxury Perfumes').map(p => p.brand).filter(Boolean))];

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
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '1px' }}>
            {isFiltered ? 'Fragrances matched to your olfactory profile' : 'Explore our complete botanical collection'}
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '100px' }}>

        {/* ═══ Search & Filter Bar ═══ */}
        {!isFiltered && (
          <div className="shop-toolbar">
            {/* Desktop Search */}
            <div className="search-bar-desktop">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Find your signature scent..."
                onChange={handleSearchInput}
                className="search-input"
                id="shop-search"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              className="mobile-search-toggle"
              onClick={handleMobileSearchToggle}
              aria-label="Search products"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            {/* Price Sort */}
            <div className="price-sort-desktop">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="price-sort-select"
                id="price-sort"
              >
                <option value="default">Sort by Price</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              className="mobile-filter-btn"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"/>
                <line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/>
                <line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="1" y1="14" x2="7" y2="14"/>
                <line x1="9" y1="8" x2="15" y2="8"/>
                <line x1="17" y1="16" x2="23" y2="16"/>
              </svg>
              Filters
            </button>
          </div>
        )}

        {/* Mobile Expanding Search */}
        {!isFiltered && (
          <div className={`mobile-search-expand ${mobileSearchOpen ? 'open' : ''}`}>
            <div className="mobile-search-inner">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Find your signature scent..."
                onChange={handleSearchInput}
                className="search-input"
              />
              <button onClick={() => setMobileSearchOpen(false)} className="mobile-search-close">✕</button>
            </div>
          </div>
        )}

        {/* ═══ Category Filter Bar (Desktop) ═══ */}
        {!isFiltered && (
          <div className="category-filter-bar" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: activeCategory === 'Luxury Perfumes' ? '20px' : '40px', flexWrap: 'wrap', padding: '0 10px' }}>
            {categories.map(cat => (
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
            marginBottom: '40px',
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
            {luxuryBrands.map(brand => (
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

        {/* Results count */}
        {!isFiltered && searchQuery && (
          <p className="search-results-count">
            {displayProducts.length} fragrance{displayProducts.length !== 1 ? 's' : ''} found
            {searchQuery && <> for "<em>{searchQuery}</em>"</>}
          </p>
        )}

        {/* ═══ Product Grid ═══ */}
        {(!Array.isArray(displayProducts) || displayProducts.length === 0) ? (
          <div className="flex-center" style={{ height: '400px', flexDirection: 'column', textAlign: 'center', gap: '30px' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No fragrances matched this profile.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setPriceSort('default'); }}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCollection={addToCollection} />
            ))}
          </div>
        )}
      </div>

      {/* ═══ Mobile Filter Drawer ═══ */}
      <div 
        className={`filter-drawer-overlay ${filterDrawerOpen ? 'open' : ''}`}
        onClick={() => setFilterDrawerOpen(false)}
      />
      <div className={`filter-drawer ${filterDrawerOpen ? 'open' : ''}`}>
        <div className="filter-drawer-header">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', letterSpacing: '2px' }}>Filters</h3>
          <button onClick={() => setFilterDrawerOpen(false)} className="filter-drawer-close">✕</button>
        </div>

        <div className="filter-drawer-body">
          {/* Category Section */}
          <div className="filter-drawer-section">
            <p className="filter-drawer-label">Category</p>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-drawer-option ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { handleCategoryChange(cat); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Sort Section */}
          <div className="filter-drawer-section">
            <p className="filter-drawer-label">Sort by Price</p>
            {[
              { value: 'default', label: 'Default' },
              { value: 'low', label: 'Low → High' },
              { value: 'high', label: 'High → Low' }
            ].map(opt => (
              <button
                key={opt.value}
                className={`filter-drawer-option ${priceSort === opt.value ? 'active' : ''}`}
                onClick={() => setPriceSort(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="filter-drawer-results">
            <p>{displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}</p>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '20px' }}
            onClick={() => setFilterDrawerOpen(false)}
          >
            View Results
          </button>

          <button 
            className="filter-drawer-reset"
            onClick={() => { handleCategoryChange('All'); setPriceSort('default'); setSearchQuery(''); }}
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
