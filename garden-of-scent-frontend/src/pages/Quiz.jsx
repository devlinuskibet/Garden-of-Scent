import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const STEPS = {
  1: {
    category: 'scent_family',
    title: 'What\'s your vibe?',
    subtitle: 'Choose the scent family that speaks to your soul.',
    choices: [
      { label: '🌊 Fresh & Clean', value: 'Fresh', desc: 'Citrus, aquatic, green' },
      { label: '🔥 Bold & Intense', value: 'Oriental', desc: 'Spicy, amber, warm' },
      { label: '🌸 Sweet & Floral', value: 'Floral', desc: 'Rose, jasmine, peony' },
      { label: '🌲 Woody & Earthy', value: 'Woody', desc: 'Cedar, vetiver, oud' },
    ]
  },
  2: {
    category: 'occasion',
    title: 'Where will you wear it?',
    subtitle: 'Pick the setting for your signature scent.',
    choices: [
      { label: '☀️ Daily Wear', value: 'Daily', desc: 'Office, errands, any day' },
      { label: '🌙 Night Out', value: 'Evening', desc: 'Dates, clubs, dinners' },
      { label: '👔 Office Power', value: 'Formal', desc: 'Boardrooms, meetings' },
      { label: '✨ Special Event', value: 'Special', desc: 'Weddings, galas, parties' },
    ]
  },
  3: {
    category: 'intensity',
    title: 'How strong should it be?',
    subtitle: 'Select your desired sillage — the trail you leave behind.',
    choices: [
      { label: 'Subtle', value: 'Light', desc: 'Close to skin, intimate' },
      { label: 'Moderate', value: 'Medium', desc: 'Noticeable, balanced' },
      { label: 'Long-Lasting', value: 'Strong', desc: 'Powerful, all-day statement' },
    ]
  }
};

const Quiz = ({ addToCollection }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({});
  const [results, setResults] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleSelect = (value) => {
    setSelectedChoice(value);

    // brief animation pause
    setTimeout(() => {
      const category = STEPS[step].category;
      const newSelections = { ...selections, [category]: value };
      setSelections(newSelections);
      setSelectedChoice(null);

      if (step < 3) {
        setStep(step + 1);
      } else {
        // Compute results
        let matched = products.filter(p => p.category === 'Luxury Perfumes');

        // Score-based matching
        const scored = matched.map(p => {
          let score = 0;
          if (p.scent_family === newSelections.scent_family) score += 3;
          if (p.occasion === newSelections.occasion) score += 2;
          if (p.intensity === newSelections.intensity) score += 2;
          return { ...p, score };
        });

        scored.sort((a, b) => b.score - a.score);
        setResults(scored.slice(0, 3));
      }
    }, 300);
  };

  const handleReset = () => {
    setStep(1);
    setSelections({});
    setResults(null);
  };

  // Results view
  if (results) {
    return (
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', paddingBottom: '120px' }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(15,26,20,0.95) 0%, var(--background) 100%)',
          padding: '80px 0 60px',
          textAlign: 'center',
          borderBottom: '1px solid var(--glass-border)',
        }}>
          <div className="container">
            <p style={{ color: 'var(--secondary)', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '15px' }}>
              Your Results
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px' }}>
              Your Perfect Matches
            </h1>
            <p style={{ opacity: 0.6, maxWidth: '500px', margin: '0 auto 30px', lineHeight: 1.8 }}>
              Based on your preferences, these are the fragrances we handpicked for you.
            </p>
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: '1px solid var(--glass-border)',
                color: 'var(--text)',
                padding: '10px 25px',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '2px',
              }}
            >
              ← Retake Quiz
            </button>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '60px' }}>
          {results.length > 0 ? (
            <>
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {results.map(product => (
                  <ProductCard key={product.id} product={product} addToCollection={addToCollection || (() => {})} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link to="/shop" className="btn btn-outline">View Full Collection →</Link>
              </div>
            </>
          ) : (
            <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '20px' }}>
              <p style={{ opacity: 0.5, fontSize: '1.1rem' }}>No exact matches found. Explore our full collection!</p>
              <Link to="/shop" className="btn btn-primary">Browse All Fragrances</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Quiz steps
  const current = STEPS[step];

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      position: 'relative',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '1px solid rgba(212,175,55,0.06)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: '1px solid rgba(212,175,55,0.04)',
      }} />

      <div className="glass" style={{ width: '100%', maxWidth: '850px', padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center', margin: '20px' }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              width: '60px',
              height: '3px',
              borderRadius: '2px',
              background: s <= step ? 'var(--secondary)' : 'var(--glass-border)',
              transition: 'background 0.4s ease',
            }} />
          ))}
        </div>

        <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '15px' }}>
          Step {step} of 3
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
          {current.title}
        </h1>
        <p style={{ opacity: 0.5, fontSize: '0.9rem', marginBottom: '50px' }}>{current.subtitle}</p>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${current.choices.length <= 3 ? '200px' : '220px'}, 1fr))`, gap: '15px' }}>
          {current.choices.map((choice) => (
            <button
              key={choice.value}
              onClick={() => handleSelect(choice.value)}
              style={{
                padding: '30px 20px',
                background: selectedChoice === choice.value ? 'rgba(212,175,55,0.15)' : 'transparent',
                border: selectedChoice === choice.value ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              <span style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 500 }}>
                {choice.label}
              </span>
              <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5 }}>
                {choice.desc}
              </span>
            </button>
          ))}
        </div>

        {step > 1 && (
          <button
            onClick={() => { setStep(step - 1); }}
            style={{
              marginTop: '40px',
              opacity: 0.5,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              color: 'var(--text)',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
          >
            ← Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
