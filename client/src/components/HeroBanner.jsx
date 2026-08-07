import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Flame, Zap, Shield, Crown } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    title: 'Aura V II Audiophile Acoustics',
    subtitle: 'Precision engineered 50mm planar magnetic drivers encased in brushed gold & aerospace titanium.',
    badge: 'LIMITED DROP',
    discount: 'SAVE $100 TODAY',
    price: '$399.99',
    originalPrice: '$499.99',
    rating: 4.95,
    reviews: 342,
    bgImg: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Electronics',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Chronos Imperial Smartwatch',
    subtitle: 'Hand-finished sapphire crystal OLED, 100m water resistance, and real-time biometric telemetry.',
    badge: 'GOLD EDITION',
    discount: 'EXCLUSIVE DROP',
    price: '$449.99',
    originalPrice: '$529.99',
    rating: 4.9,
    reviews: 289,
    bgImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Electronics',
    category: 'Electronics',
  },
  {
    id: 3,
    title: 'Valo Apex Luxury Performance Runner',
    subtitle: 'Custom nitrogen-infused midsole with full-length carbon fiber plate for effortless movement.',
    badge: 'EDITORIAL PICK',
    discount: 'NEW ARRIVAL',
    price: '$229.99',
    originalPrice: '$279.99',
    rating: 4.88,
    reviews: 415,
    bgImg: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Footwear',
    category: 'Footwear',
  },
  {
    id: 4,
    title: 'Scandi Oak Ergonomic Lounge Chair',
    subtitle: 'Handcrafted sustainable solid Nordic oak structure upholstered in supple full-grain Italian leather.',
    badge: 'ARCHITECT SERIES',
    discount: '15% SPECIAL DROP',
    price: '$689.99',
    originalPrice: '$799.99',
    rating: 4.98,
    reviews: 176,
    bgImg: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Furniture',
    category: 'Furniture',
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '3.5rem',
      minHeight: '520px',
      border: '1px solid var(--border-glass)',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Image with Dynamic Fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${slide.bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'brightness(0.5)'
      }} />

      {/* Multi-stage Glass Gradient Mask */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.78) 55%, rgba(7, 9, 14, 0.35) 100%)'
      }} />

      {/* Content Inner Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        padding: '3.5rem 3.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        
        {/* Left Column: Hero Text & Buttons */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.9rem' }}>
              <Crown size={14} color="#fbbf24" /> {slide.badge}
            </span>
            <span className="badge badge-secondary" style={{ padding: '0.4rem 0.9rem' }}>
              {slide.discount}
            </span>
          </div>

          <h1 style={{
            fontSize: '3.2rem',
            lineHeight: '1.15',
            marginBottom: '1.25rem',
            color: '#fff',
            fontWeight: '900',
            letterSpacing: '0.02em',
            fontFamily: "'Cinzel', serif",
            textShadow: '0 4px 25px rgba(0,0,0,0.8)'
          }}>
            {slide.title}
          </h1>

          <p style={{
            color: '#cbd5e1',
            fontSize: '1.15rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontWeight: '400',
            maxWidth: '560px'
          }}>
            {slide.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Link to={slide.link} className="glass-btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', fontWeight: '800' }}>
              Acquire Piece <ArrowRight size={18} />
            </Link>

            <Link to="/products" className="glass-btn btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Right Column: Glass Product Feature Card & Timer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glass-panel animate-fade-in" style={{
            padding: '1.85rem',
            maxWidth: '350px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
          }}>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                CURATED SPOTLIGHT
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700' }}>
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>{slide.rating}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>({slide.reviews})</span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: '900', color: '#fff', fontFamily: "'Cinzel', serif" }}>
                {slide.price}
              </span>
              <span style={{ fontSize: '1.05rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                {slide.originalPrice}
              </span>
            </div>

            {/* Countdown Box */}
            <div style={{
              background: 'rgba(7, 9, 14, 0.6)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              border: '1px solid var(--border-glass)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Clock size={14} /> Private Drop Closes In:
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <span style={{ color: '#fbbf24', fontSize: '1.15rem', fontWeight: '900', display: 'block' }}>0{timeLeft.hours}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem', letterSpacing: '0.05em' }}>HOURS</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <span style={{ color: '#fbbf24', fontSize: '1.15rem', fontWeight: '900', display: 'block' }}>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem', letterSpacing: '0.05em' }}>MINS</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <span style={{ color: '#fbbf24', fontSize: '1.15rem', fontWeight: '900', display: 'block' }}>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem', letterSpacing: '0.05em' }}>SECS</span>
                </div>
              </div>
            </div>

            <Link to={slide.link} className="glass-btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.92rem', fontWeight: '800' }}>
              <Zap size={16} color="#07090e" /> Order Spotlight Drop
            </Link>

          </div>
        </div>

      </div>

      {/* Carousel Navigation Dots */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '40px',
        zIndex: 10,
        display: 'flex',
        gap: '0.6rem'
      }}>
        {bannerSlides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: idx === currentSlide ? '36px' : '10px',
              height: '10px',
              borderRadius: 'var(--radius-full)',
              background: idx === currentSlide ? '#f59e0b' : 'rgba(255, 255, 255, 0.25)',
              transition: 'var(--transition)',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroBanner;
