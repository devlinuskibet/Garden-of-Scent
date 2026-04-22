import React from 'react';

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="flex-between" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Your Collection</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text)' }}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-center" style={{ height: '60%', flexDirection: 'column', opacity: 0.5 }}>
            <p style={{ marginBottom: '20px' }}>Your collection is empty.</p>
            <button className="btn btn-outline" onClick={onClose}>Explore Scents</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 100px)' }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {cart.map((item) => (
                <div key={item.id} className="glass" style={{ padding: '15px', marginBottom: '15px', display: 'flex', gap: '15px' }}>
                  <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h4>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>KSh {item.price.toFixed(2)}</p>
                    <div className="flex-between">
                      <div className="flex" style={{ border: '1px solid var(--glass-border)', padding: '2px 10px', gap: '15px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ fontSize: '0.8rem', opacity: 0.5, borderBottom: '1px solid currentColor' }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <div className="flex-between" style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '1.2rem' }}>Total</span>
                <span style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>KSh {total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
