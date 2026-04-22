import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ vibe: '', intensity: '', occasion: '' });
  const navigate = useNavigate();

  const options = {
    1: {
      category: 'vibe',
      title: 'What is your desired aura?',
      choices: [
        { label: 'Romantic & Floral', value: 'Romantic' },
        { label: 'Bold & Sophisticated', value: 'Bold' },
        { label: 'Warm & Sensual', value: 'Warm' },
        { label: 'Minimalist & Fresh', value: 'Minimalist' }
      ]
    },
    2: {
      category: 'intensity',
      title: 'Select your preferred sillage.',
      choices: [
        { label: 'Subtle (Light)', value: 'Light' },
        { label: 'Presence (Medium)', value: 'Medium' },
        { label: 'Statement (Strong/Bold)', value: 'Bold' }
      ]
    },
    3: {
      category: 'occasion',
      title: 'Where will you wear this scent?',
      choices: [
        { label: 'Daily Rituals', value: 'Daily' },
        { label: 'Enchanting Evenings', value: 'Evening' },
        { label: 'Formal Gatherings', value: 'Formal' },
        { label: 'Intimate Dates', value: 'Date Night' }
      ]
    }
  };

  const handleSelect = (value) => {
    const category = options[step].category;
    const newSelections = { ...selections, [category]: value };
    setSelections(newSelections);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      const queryParams = new URLSearchParams(newSelections).toString();
      navigate(`/shop?${queryParams}`);
    }
  };

  const current = options[step];

  return (
    <div className="flex-center" style={{ minHeight: '100vh', paddingTop: 'var(--header-height)', background: 'var(--background)' }}>
      <div className="glass reveal active" style={{ width: '100%', maxWidth: '800px', padding: '80px', textAlign: 'center' }}>
        <p style={{ color: 'var(--secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '20px' }}>
          Step {step} of 3
        </p>
        <h1 style={{ fontSize: '3rem', marginBottom: '60px', fontFamily: 'var(--font-heading)' }}>{current.title}</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {current.choices.map((choice) => (
            <button 
              key={choice.value}
              className="btn btn-outline"
              style={{ padding: '30px', fontSize: '1rem', color: 'var(--text)' }}
              onClick={() => handleSelect(choice.value)}
            >
              {choice.label}
            </button>
          ))}
        </div>
        
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            style={{ marginTop: '40px', opacity: 0.5, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--text)' }}
          >
            &larr; Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
