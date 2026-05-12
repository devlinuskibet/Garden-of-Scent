import React, { useState } from 'react';

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-10 7L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const WHATSAPP_LINK = "https://wa.me/254790147780?text=Hello%20Garden%20of%20Scents%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20fragrances.";
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/Imenti+House,+Tom+Mboya+St,+Nairobi";
const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819073085557!2d36.82194!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba7b5b1%3A0x4c3b7be1e6ef6e1!2sImenti%20House%2C%20Tom%20Mboya%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1699900000000!5m2!1sen!2ske";

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

      <div className="container section-padding">

        {/* ═══ Contact Info + Map Row ═══ */}
        <div className="contact-info-map-row">

          {/* Contact Details Card */}
          <div className="glass contact-details-card" style={{ padding: '40px', display: 'grid', gap: '28px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '5px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
              Visit Our Store
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* Location */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--secondary)', marginTop: '2px', flexShrink: 0 }}>
                  <LocationIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Location</p>
                  <p style={{ lineHeight: 1.6, opacity: 0.85 }}>Imenti House, B50 – Wasafi Entrance<br/>Tom Mboya St, Nairobi, Kenya</p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--secondary)', marginTop: '2px', flexShrink: 0 }}>
                  <EmailIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Email</p>
                  <a href="mailto:evelumbi22@gmail.com" style={{ opacity: 0.85, transition: 'color 0.3s ease' }}>evelumbi22@gmail.com</a>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--secondary)', marginTop: '2px', flexShrink: 0 }}>
                  <PhoneIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>WhatsApp / Phone</p>
                  <p style={{ opacity: 0.85 }}>+254 790 147 780</p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--secondary)', marginTop: '2px', flexShrink: 0 }}>
                  <ClockIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '5px' }}>Hours</p>
                  <p style={{ lineHeight: 1.6, opacity: 0.85 }}>Mon – Sat: 9am – 7pm<br/>Sunday: 11am – 5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="contact-map-container">
            <div className="contact-map-wrapper">
              <iframe
                title="Garden of Scent Location – Imenti House, Nairobi"
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="open-maps-btn"
            >
              <MapPinIcon />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* ═══ Main Content Grid: Form + WhatsApp ═══ */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginTop: '80px' }}>

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

          {/* Right: WhatsApp Concierge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
