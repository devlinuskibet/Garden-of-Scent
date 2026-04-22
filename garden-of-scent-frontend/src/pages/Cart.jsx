import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Midnight Bloom', price: 185, quantity: 1, img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300', size: '50ml' },
    { id: 3, name: 'Velvet Wood', price: 150, quantity: 2, img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=300', size: '100ml' }
  ]);

  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQ = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQ };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="container slide-up" style={{ paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '60px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>Your Cart</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2 style={{ opacity: 0.7, marginBottom: '20px' }}>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary">Discover Fragrances</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          {/* Cart Items Area */}
          <div style={{ flex: '1 1 600px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', padding: '30px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                  <img src={item.img} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1, padding: '0 20px' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{item.name}</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '10px' }}>{item.size}</p>
                    <button style={{ color: 'var(--text)', opacity: 0.6, fontSize: '0.9rem', textDecoration: 'underline' }} onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>KSh {(item.price * item.quantity).toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                      <button style={{ padding: '8px 12px', color: 'var(--text)' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span style={{ padding: '8px 12px', opacity: 0.9 }}>{item.quantity}</span>
                      <button style={{ padding: '8px 12px', color: 'var(--text)' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <aside style={{ flex: '1 1 350px', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '8px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', opacity: 0.8 }}>
              <span>Subtotal</span>
              <span>KSh {subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', opacity: 0.8 }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `KSh ${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '20px' }}>Free shipping on orders over KSh 200</p>}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginBottom: '40px', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>KSh {total.toFixed(2)}</span>
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Proceed to Checkout</button>
            <div style={{ textAlign: 'center', marginTop: '20px', opacity: 0.5, fontSize: '0.8rem' }}>
              <p>Secure SSL Checkout</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
