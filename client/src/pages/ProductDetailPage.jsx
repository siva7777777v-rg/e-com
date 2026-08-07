import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, ShieldCheck, ArrowLeft, Check, Minus, Plus, Gem } from 'lucide-react';
import { fetchProductByIdApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductByIdApi(id);
        setProduct(data);
        setSelectedImg(data.mainImg);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Retrieving Lumina piece details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem', fontFamily: "'Cinzel', serif" }}>Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="glass-btn btn-primary">
          Return to Catalog
        </button>
      </div>
    );
  }

  const discountedPrice = (product.price - (product.price * (product.discount || 0) / 100)).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleShopNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="glass-btn btn-secondary"
        style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', marginBottom: '1.75rem' }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        
        {/* Left Image Gallery */}
        <div>
          <div className="glass-panel" style={{
            position: 'relative',
            width: '100%',
            height: '440px',
            overflow: 'hidden',
            marginBottom: '1rem',
            padding: '1rem',
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}>
            <img
              src={selectedImg || product.mainImg}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          {/* Thumbnails */}
          {product.carousel && product.carousel.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
              <img
                src={product.mainImg}
                alt="thumb"
                onClick={() => setSelectedImg(product.mainImg)}
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: selectedImg === product.mainImg ? '2px solid #f59e0b' : '1px solid var(--border-glass)'
                }}
              />
              {product.carousel.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImg(img)}
                  style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImg === img ? '2px solid #f59e0b' : '1px solid var(--border-glass)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Details Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-primary">{product.category}</span>
            <span className="badge badge-secondary">{product.gender}</span>
            <span style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Check size={14} /> Vault Stocked ({product.stock} pieces)
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.75rem', lineHeight: '1.2', fontFamily: "'Cinzel', serif" }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.8) ? "#fbbf24" : "transparent"} color="#fbbf24" />
              ))}
            </div>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>{product.rating || 4.8}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviewCount || 148} patron reviews)</span>
          </div>

          {/* Price Box */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'baseline', gap: '1rem', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <span style={{ fontSize: '2.3rem', fontWeight: '900', color: '#fbbf24', fontFamily: "'Cinzel', serif" }}>
              ${discountedPrice}
            </span>
            {product.discount > 0 && (
              <>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  ${product.price}
                </span>
                <span className="badge badge-secondary" style={{ fontSize: '0.8rem' }}>
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p style={{ color: '#cbd5e1', lineHeight: '1.65', marginBottom: '1.75rem', fontSize: '0.98rem' }}>
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', color: '#fff', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.9rem', fontFamily: "'Cinzel', serif" }}>
                Select Variant / Size:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '0.55rem 1.1rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedSize === sz ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedSize === sz ? '#07090e' : 'var(--text-muted)',
                      border: selectedSize === sz ? '1px solid #f59e0b' : '1px solid var(--border-glass)',
                      fontWeight: selectedSize === sz ? '800' : '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          {!isAdmin && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#fff', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.9rem', fontFamily: "'Cinzel', serif" }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="glass-btn btn-secondary"
                  style={{ padding: '0.5rem', width: '40px', height: '40px' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fbbf24', minWidth: '32px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="glass-btn btn-secondary"
                  style={{ padding: '0.5rem', width: '40px', height: '40px' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isAdmin ? (
            <button
              onClick={() => navigate('/admin')}
              className="glass-btn btn-secondary"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem',
                color: '#10b981',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                background: 'rgba(16, 185, 129, 0.1)',
                fontWeight: '700'
              }}
            >
              <ShieldCheck size={18} /> Manage Piece in Admin Suite
            </button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                className="glass-btn btn-secondary"
                style={{ padding: '0.9rem', fontSize: '1rem', fontWeight: '700' }}
              >
                <ShoppingBag size={18} color="#fbbf24" /> Add to Bag
              </button>

              <button
                onClick={handleShopNow}
                className="glass-btn btn-primary"
                style={{ padding: '0.9rem', fontSize: '1rem', fontWeight: '800' }}
              >
                <Zap size={18} color="#07090e" /> Shop Now
              </button>
            </div>
          )}

          {/* Added Toast Notification */}
          {addedToast && (
            <div className="badge badge-success animate-fade-in" style={{ padding: '0.75rem', justifyContent: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
              <Check size={16} /> Lumina piece added to bag successfully!
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;
