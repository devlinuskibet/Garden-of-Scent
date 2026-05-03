import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotePyramid from '../components/NotePyramid';

const ProductDetail = ({ addToCollection }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  if (!product) return <div className="flex-center" style={{ height: '100vh' }}>Product not found.</div>;

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '100px' }}>
      <Link to="/shop" style={{ display: 'inline-block', marginBottom: '60px', opacity: 0.5, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
        &larr; Back to Boutique
      </Link>
      
      <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          <div className="glass" style={{ padding: '10px' }}>
            <img 
              src={product.image_url} 
              alt={product.name} 
              style={{ width: '100%', height: '700px', objectFit: 'cover' }} 
            />
          </div>
        </div>
        
        <div style={{ flex: '1 1 500px' }}>
          <p style={{ color: 'var(--secondary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontSize: '0.9rem' }}>
            {product.scent_family} &bull; {product.intensity}
          </p>
          <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '40px' }}>KSh {product.price.toFixed(2)}</p>
          
          <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '50px', lineHeight: 1.8, maxWidth: '600px' }}>
            {product.description}
          </p>
          
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
            Olfactory Profile
          </h3>
          
          <NotePyramid 
            top={product.top_notes} 
            heart={product.heart_notes} 
            base={product.base_notes} 
          />

          <div style={{ marginTop: '60px', display: 'flex', gap: '20px' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, padding: '20px' }}
              onClick={() => addToCollection(product)}
            >
              Add to Collection
            </button>
          </div>
          
          <div style={{ marginTop: '40px', display: 'flex', gap: '40px', opacity: 0.6, fontSize: '0.9rem' }}>
            <div>
              <p style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Best For</p>
              <p>{product.occasion}</p>
            </div>
            <div>
              <p style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Vibe</p>
              <p>{product.vibe_tag}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
