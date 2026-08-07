import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Gem, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '4.5rem',
      background: 'rgba(7, 9, 14, 0.95)',
      borderTop: '1px solid var(--border-glass)',
      padding: '4rem 0 2rem 0',
      backdropFilter: 'blur(24px)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gem size={18} color="#07090e" />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>LUMINA</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Lumina Retail Inc. is your premier destination for modern luxury, high-fidelity audio, precision wearables, and curated architectural apparel.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '1.25rem', fontSize: '1rem', fontFamily: "'Cinzel', serif" }}>Explore Collections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/products" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All Collections</Link></li>
              <li><Link to="/products?category=Electronics" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Acoustics & Wearables</Link></li>
              <li><Link to="/products?category=Fashion" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Luxury Apparel</Link></li>
              <li><Link to="/products?category=Footwear" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Footwear & Kicks</Link></li>
            </ul>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '1.25rem', fontSize: '1rem', fontFamily: "'Cinzel', serif" }}>MERN Architecture</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Model: MongoDB Mongoose Data Schemas</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>View: React Vite + Amber Obsidian UI</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Controller: Express REST Controllers</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Security: JWT Auth & Bcrypt Hash</li>
            </ul>
          </div>

          {/* Admin Fast Link */}
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '1.25rem', fontSize: '1rem', fontFamily: "'Cinzel', serif" }}>Admin Suite</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Pre-configured admin suite for total product catalog management, order fulfillment, and user access controls.
            </p>
            <Link to="/auth" className="glass-btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}>
              Access Admin Suite
            </Link>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--text-dim)',
          fontSize: '0.85rem'
        }}>
          <div>
            © 2026 Lumina Retail Inc. All rights reserved. Curated Modern E-Commerce.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Crafted with <Heart size={14} color="#f59e0b" fill="#f59e0b" /> for Mentor Review
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
