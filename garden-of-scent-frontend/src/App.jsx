import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
import CartDrawer from './components/CartDrawer';

const WHATSAPP_LINK = "https://wa.me/254790147780?text=Hello%2C%20what%20perfume%20are%20you%20looking%20for%20today%3F";

const WhatsAppFAB = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    title="Chat on WhatsApp"
    style={{
      position: 'fixed',
      bottom: '35px',
      right: '35px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: '#25D366',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textDecoration: 'none',
      color: '#fff',
    }}
    onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 211, 102, 0.6)'; }}
    onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.4)'; }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, width: '100%', height: 'var(--header-height)', 
      zIndex: 100
    }}>
      <div className="container flex-between" style={{ height: '100%' }}>
        <Link to="/" style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', letterSpacing: '2px' }}>GARDEN OF SCENT</Link>
        <ul className="flex" style={{ gap: '40px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          <li><Link to="/shop">Boutique</Link></li>
          <li><Link to="/about">Heritage</Link></li>
          <li><Link to="/quiz" style={{ color: 'var(--secondary)' }}>Scent Finder ✦</Link></li>
          <li><Link to="/contact">Concierge</Link></li>
        </ul>
        <div className="flex" style={{ gap: '30px', alignItems: 'center' }}>
          <button 
            onClick={onCartClick} 
            style={{ 
              color: 'var(--text)', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              border: 'none',
              background: 'none'
            }}
          >
            Collection <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>({cartCount})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', marginTop: '80px', background: '#080d0a' }}>
    <div className="container">
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ maxWidth: '300px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Garden of Scent</h2>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Crafting olfactory memories through the purest botanical extractions.</p>
        </div>
        <div className="flex" style={{ gap: '60px', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ color: 'var(--secondary)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px' }}>Explore</h4>
            <ul style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 2.2, listStyle: 'none' }}>
              <li><Link to="/shop">The Boutique</Link></li>
              <li><Link to="/quiz">Scent Finder ✦</Link></li>
              <li><Link to="/about">Our Heritage</Link></li>
              <li><Link to="/contact">Concierge</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '80px', fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} GARDEN OF SCENT. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const setupObserver = () => {
      const reveals = document.querySelectorAll('.reveal:not(.active)');
      reveals.forEach(el => observer.observe(el));
    };

    // Initial setup
    setupObserver();

    // Watch for dynamic content (like products from API)
    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);


  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onCartClick={() => setIsDrawerOpen(true)} />
      
      <CartDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFAB />
    </Router>
  );
}

