import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
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
          src={product.image_url} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)' 
          }}
          className="product-image"
        />
        
        <div className="hover-overlay" style={{
          position: 'absolute',
          bottom: '-60px',
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'bottom 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          cursor: 'pointer'
        }} onClick={() => addToCart(product)}>
          <span style={{ color: '#000', fontWeight: 600, letterSpacing: '1px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            Add to Collection
          </span>
        </div>
      </div>
      
      <Link to={`/product/${product.id}`} style={{ padding: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          {product.scent_family}
        </p>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{product.name}</h3>
        <p style={{ opacity: 0.6, fontSize: '1rem' }}>KSh {product.price.toFixed(2)}</p>
      </Link>

      <style>{`
        .glass:hover .product-image {
          transform: scale(1.1);
        }
        .glass:hover .hover-overlay {
          bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
