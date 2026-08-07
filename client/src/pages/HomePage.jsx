import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Zap, ArrowRight, Star, Flame, Award, Heart, CheckCircle2, Send, Crown, Gem } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { fetchProductsApi } from '../services/api';

const categoriesList = [
  {
    name: 'Electronics',
    icon: '🎧',
    count: '10 Pieces',
    desc: 'Audiophile acoustics, smart chronographs & pro studio gear.',
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.4) 100%)',
  },
  {
    name: 'Fashion',
    icon: '🧥',
    count: '10 Pieces',
    desc: 'Architectural outerwear, silk dresses & bespoke leather.',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(4, 120, 87, 0.4) 100%)',
  },
  {
    name: 'Footwear',
    icon: '👟',
    count: '10 Pieces',
    desc: 'Luxury performance runners, limited kicks & Italian boots.',
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(14, 116, 144, 0.4) 100%)',
  },
  {
    name: 'Furniture',
    icon: '🪑',
    count: '10 Pieces',
    desc: 'Ergonomic lounge seats, oak desks & minimalist decor.',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(217, 119, 6, 0.4) 100%)',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Victoria Vance',
    role: 'Verified VIP Member',
    comment: 'LUMINA provides an unparalleled online shopping experience! The Aura Acoustics arrived in handcrafted gold foil packaging within 24 hours.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Alexander Sterling',
    role: 'Product Designer',
    comment: 'The 1-click checkout and refined amber obsidian aesthetic are incredible. Tracking my Chronos Imperial watch was seamless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Architectural Lead',
    comment: 'Exquisite build quality for the Scandi Oak Lounge. Stunning UI design, instantaneous API response, and 5-star concierge service!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductsApi({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
        });
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const flashDeals = products.filter((p) => (p.discount || 0) >= 15).slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Value Propositions Bar */}
      <div className="glass-panel" style={{
        padding: '2.25rem',
        marginBottom: '4.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(7, 9, 14, 0.95) 100%)',
        borderColor: 'rgba(245, 158, 11, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', boxShadow: '0 0 18px rgba(245,158,11,0.25)' }}>
            <Truck size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem', fontFamily: "'Cinzel', serif" }}>Express Delivery</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complimentary express shipping on $150+</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', boxShadow: '0 0 18px rgba(16,185,129,0.25)' }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem', fontFamily: "'Cinzel', serif" }}>256-Bit SSL Shield</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Encrypted COD, Card & Digital Vault</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', boxShadow: '0 0 18px rgba(6,182,212,0.25)' }}>
            <RefreshCw size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem', fontFamily: "'Cinzel', serif" }}>30-Day Concierge Exchange</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Seamless money-back guarantee</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', boxShadow: '0 0 18px rgba(251,191,36,0.25)' }}>
            <Zap size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem', fontFamily: "'Cinzel', serif" }}>1-Click Instant Order</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant checkout flow to confirmation</p>
          </div>
        </div>
      </div>

      {/* 3. Category Grid Showcase */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              CURATED COLLECTIONS
            </span>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: '900', fontFamily: "'Cinzel', serif" }}>Explore Luxury Categories</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Discover handpicked modern essentials engineered for refined living.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="glass-card animate-fade-in"
              style={{
                position: 'relative',
                height: '290px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.75rem',
                textDecoration: 'none',
                borderTop: '2px solid rgba(245, 158, 11, 0.4)'
              }}
            >
              {/* Card Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${cat.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4)',
                transition: 'transform 0.6s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />

              {/* Gradient Mask */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.4) 60%, transparent 100%)'
              }} />

              {/* Content Overlay */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                    {cat.count}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.45rem', color: '#fff', fontWeight: '800', marginBottom: '0.4rem', fontFamily: "'Cinzel', serif" }}>
                  {cat.name}
                </h3>
                
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '1rem' }}>
                  {cat.desc}
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem' }}>
                  View Collection <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Flash Deals Spotlight Banner */}
      {flashDeals.length > 0 && (
        <div style={{ marginBottom: '4.5rem' }}>
          <div className="glass-panel" style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
            borderColor: 'rgba(245, 158, 11, 0.35)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                  <Crown size={20} color="#fbbf24" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.12em' }}>PRIVATE DROP OFFERS</span>
                </div>
                <h2 style={{ fontSize: '2.3rem', color: '#fff', fontWeight: '900', fontFamily: "'Cinzel', serif" }}>Limited Spotlight Discounts</h2>
              </div>

              <Link to="/products" className="glass-btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem', fontWeight: '800' }}>
                View All Drops <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {flashDeals.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Catalog Grid with Filter Pills */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.25rem' }}>
              <Award size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                LIVE VAULT CATALOG
              </span>
            </div>
            <h2 style={{ fontSize: '2.3rem', color: '#fff', fontWeight: '900', fontFamily: "'Cinzel', serif" }}>Featured Lumina Showcase</h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['All', 'Electronics', 'Fashion', 'Footwear', 'Furniture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="glass-btn"
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.9rem',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#07090e' : 'var(--text-muted)',
                  fontWeight: selectedCategory === cat ? '800' : '500',
                  borderColor: selectedCategory === cat ? '#f59e0b' : 'var(--border-glass)',
                  boxShadow: selectedCategory === cat ? '0 0 16px var(--primary-glow)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            Loading Lumina vault pieces...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products" className="glass-btn btn-secondary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', fontWeight: '800' }}>
            Browse Complete Lumina Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* 6. Customer Testimonials Section */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
            <Gem size={18} color="#fbbf24" />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.12em' }}>VIP REVIEWS</span>
          </div>
          <h2 style={{ fontSize: '2.3rem', color: '#fff', fontWeight: '900', fontFamily: "'Cinzel', serif" }}>Patron Testimonials</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {testimonials.map((t) => (
            <div key={t.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '2px solid rgba(245, 158, 11, 0.3)' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "{t.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #f59e0b' }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', fontFamily: "'Cinzel', serif" }}>{t.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={12} /> {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Newsletter Subscription Section */}
      <div className="glass-panel" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(16, 185, 129, 0.18) 100%)',
        borderColor: 'rgba(245, 158, 11, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>INSIDER ACCESS</span>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', fontWeight: '900', marginBottom: '0.75rem', fontFamily: "'Cinzel', serif" }}>
            Subscribe & Enjoy 15% Off Your Order
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Join the Lumina VIP circle for instant promo vouchers, secret vault releases, and private drop invites directly in your inbox.
          </p>

          {subscribed ? (
            <div className="badge badge-success animate-fade-in" style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem', margin: '0 auto', background: 'rgba(16, 185, 129, 0.25)', color: '#6ee7b7' }}>
              <CheckCircle2 size={18} /> Thank you for joining! Your 15% promo voucher code is <strong style={{ color: '#fff', marginLeft: '0.3rem' }}>LUMINA2026</strong>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="glass-input"
                style={{ flex: '1 1 280px', padding: '0.85rem 1.25rem' }}
              />
              <button type="submit" className="glass-btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontWeight: '800' }}>
                Join VIP Circle <Send size={16} color="#07090e" />
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
