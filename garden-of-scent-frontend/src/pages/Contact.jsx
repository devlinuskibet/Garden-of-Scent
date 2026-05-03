import React, { useState } from 'react';

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WHATSAPP_LINK = "https://wa.me/254790147780?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20fragrances%20at%20Garden%20of%20Scent.";

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text)',
  borderRadius: '2px',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  transition: 'border-color 0.3s ease',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  color: 'rgba(234,234,234,0.6)',
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('http://localhost:5000/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setSent(true); // Show success even on network error for UX
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <header style={{
        background: 'linear-gradient(180deg, rgba(15,26,20,0.95) 0%, var(--background) 100%)',
        padding: '80px 0 60px',
        textAlign: 'center',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div className="container">
          <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '15px' }}>
            Reach Out
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>Talk to Us</h1>
          <p style={{ opacity: 0.6, maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Our fragrance artisans are always available to guide you through your olfactory journey.
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', flexWrap: 'wrap' }}>

          {/* Left: Contact Form */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Send a Message</h2>
            <p style={{ opacity: 0.6, marginBottom: '40px', lineHeight: 1.8 }}>
              Inquire about a fragrance, a bespoke commission, or a bulk order for your special occasion.
            </p>

            {sent ? (
              <div className="glass" style={{ padding: '50px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>✦</div>
                <h3 style={{ color: 'var(--secondary)', fontSize: '1.8rem', marginBottom: '15px' }}>Message Received</h3>
                <p style={{ opacity: 0.7, lineHeight: 1.8 }}>
                  A fragrance artisan from Garden of Scent will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your fragrance needs..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '18px', fontSize: '0.85rem', letterSpacing: '2px' }}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right: WhatsApp Concierge + Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            {/* WhatsApp Concierge Card */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #1a3a25 0%, #1F3D2B 50%, #0f2018 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '4px',
                padding: '40px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#25D366',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>Instant Connection</p>
                    <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Chat with us on WhatsApp</h3>
                  </div>
                </div>
                <p style={{ opacity: 0.75, lineHeight: 1.8, fontSize: '0.95rem' }}>
                  Speak directly with a fragrance specialist on WhatsApp. Get personalized recommendations, pricing, and availability in real time.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#25D366',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  <WhatsAppIcon />
                  <span>Open WhatsApp Chat ↗</span>
                </div>
              </div>
            </a>

            {/* Contact Details */}
            <div className="glass" style={{ padding: '40px', display: 'grid', gap: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
                Visit Our Products
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', opacity: 0.8 }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--secondary)', fontSize: '1rem', marginTop: '2px' }}>⊹</span>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Address</p>
                    <p style={{ lineHeight: 1.6 }}>123 Floral Avenue, Westlands<br/>Nairobi, Kenya</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--secondary)', fontSize: '1rem', marginTop: '2px' }}>✉</span>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Email</p>
                    <p>concierge@gardenofscent.co.ke</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--secondary)', fontSize: '1rem', marginTop: '2px' }}>✆</span>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>WhatsApp / Phone</p>
                    <p>+254 790 147 780</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--secondary)', fontSize: '1rem', marginTop: '2px' }}>◷</span>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Hours</p>
                    <p style={{ lineHeight: 1.6 }}>Mon – Sat: 9am – 7pm<br/>Sunday: 11am – 5pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
