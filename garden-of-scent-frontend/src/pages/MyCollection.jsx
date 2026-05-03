import React from 'react';
import ProductCard from '../components/ProductCard';

const MyCollection = ({ collection, removeFromCollection }) => {
  const generateWhatsAppUrl = () => {
    let message = `Hello! I have curated my collection at Garden of Scent. I am interested in:\n`;
    collection.forEach((item, index) => {
      message += `${index + 1}. ${item.name} by ${item.brand}\n`;
    });
    message += `\nPlease let me know the total price.`;
    return `https://wa.me/254790147780?text=${encodeURIComponent(message)}`;
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', paddingBottom: '120px' }}>
      <header style={{
        background: 'linear-gradient(180deg, rgba(15,26,20,0.95) 0%, var(--background) 100%)',
        padding: '80px 0 60px',
        textAlign: 'center',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container">
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '15px' }}>
            Your Wishlist
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            My Collection
          </h1>
          <p style={{ opacity: 0.6, fontSize: '1rem', letterSpacing: '1px' }}>
            A curated selection of your favorite botanical extractions
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '60px' }}>
        {collection.length === 0 ? (
          <div className="flex-center" style={{ height: '400px', flexDirection: 'column', textAlign: 'center', gap: '30px' }}>
            <p style={{ opacity: 0.5, fontSize: '1.2rem', fontStyle: 'italic', fontFamily: '"Playfair Display", serif' }}>
              Your garden is empty. Explore our scents to find your first bloom.
            </p>
            <a href="/shop" className="btn btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>Back to Shop</a>
          </div>
        ) : (
          <div className="product-grid">
            {collection.map(product => (
              <div key={product.id} style={{ position: 'relative' }}>
                <ProductCard product={product} addToCollection={() => {}} />
                {/* Remove button overlaid */}
                <button
                  onClick={() => removeFromCollection(product.id)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.6)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                  title="Remove from Collection"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Summary Bar */}
      {collection.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(10, 15, 12, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--glass-border)',
          padding: '20px 0',
          zIndex: 900,
          boxShadow: '0 -10px 30px rgba(0,0,0,0.5)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Ready to Order?</h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>You have {collection.length} item{collection.length !== 1 ? 's' : ''} in your collection.</p>
            </div>
            <a 
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--secondary)',
                color: '#000',
                padding: '15px 30px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(197, 168, 128, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Request Collection via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;
