import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCollection }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCollection(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const isLuxury = product.category === 'Luxury Perfumes';
  const noteSnippet = isLuxury ? 'Oriental Floral' : 'Sweet & Fruity';
  const whatsappUrl = `https://wa.me/254790147780?text=${encodeURIComponent(`I am interested in ${product.name} by ${product.brand}. Is it available?`)}`;
  const displayImage = isLuxury ? '/assets/perfume_placeholder.png' : '/assets/mist_placeholder.png';

  return (
    <div className="glass reveal" style={{ 
      overflow: 'hidden', 
      position: 'relative', 
      transition: 'transform 0.5s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: '400px' }}>
        <img 
          src={displayImage} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
            filter: `hue-rotate(${product.id * 15}deg)`
          }}
          className="product-image"
        />
        
        {/* Top-Right Icon */}
        <button
          onClick={handleAdd}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'var(--secondary)',
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            transform: added ? 'scale(1.1)' : 'scale(1)',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}
          title="Save to Collection"
        >
          {added ? '✓' : '+'}
        </button>
      </div>
      
      <div style={{ padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <p style={{ 
          fontFamily: '"Playfair Display", serif',
          fontSize: '0.75rem', 
          color: 'var(--secondary)', 
          letterSpacing: '2px', 
          textTransform: 'uppercase', 
          marginBottom: '4px' 
        }}>
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{product.name}</h3>
        </Link>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '15px', fontStyle: 'italic' }}>
          {noteSnippet}
        </p>
        <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '20px' }}>KSh {product.price.toFixed(2)}</p>
        
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 'auto',
            padding: '12px',
            border: '1px solid var(--secondary)',
            color: 'var(--secondary)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease',
            display: 'block'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--secondary)';
            e.target.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--secondary)';
          }}
        >
          Order via WhatsApp
        </a>

        <button
          onClick={handleAdd}
          style={{
            marginTop: '12px',
            background: 'none',
            border: 'none',
            color: added ? 'var(--secondary)' : 'var(--text)',
            opacity: added ? 1 : 0.6,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          {added ? (
            <><span style={{ color: 'var(--secondary)' }}>✓</span> Added</>
          ) : (
            <>+ Add to Collection</>
          )}
        </button>
      </div>

      <style>{`
        .glass:hover .product-image {
          transform: scale(1.1);
        }

      `}</style>
    </div>
  );
};

export default ProductCard;
