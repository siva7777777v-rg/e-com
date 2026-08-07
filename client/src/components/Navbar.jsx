import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, ShieldCheck, LogOut, Sparkles, LayoutDashboard, Gem } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Announcement Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>✨ COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS OVER $150 &nbsp;•&nbsp; USE CODE: <strong>LUMINA2026</strong> FOR 15% OFF &nbsp;•&nbsp; CURATED LUXURY & TECH &nbsp;•&nbsp; </span>
          <span>✨ COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS OVER $150 &nbsp;•&nbsp; USE CODE: <strong>LUMINA2026</strong> FOR 15% OFF &nbsp;•&nbsp; CURATED LUXURY & TECH &nbsp;•&nbsp; </span>
        </div>
      </div>

      <header className="glass-nav">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(245, 158, 11, 0.45)'
            }}>
              <Gem size={22} color="#07090e" />
            </div>
            <div>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.6rem',
                fontWeight: '900',
                letterSpacing: '0.08em',
                background: 'linear-gradient(90deg, #fffbeb 0%, #fbbf24 60%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                LUMINA
              </span>
              <span style={{ display: 'block', fontSize: '0.62rem', color: '#cbd5e1', letterSpacing: '0.22em', fontWeight: '700', textTransform: 'uppercase' }}>
                Modern Luxury & Tech
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={{
              color: isActive('/') ? '#fbbf24' : '#cbd5e1',
              fontWeight: isActive('/') ? '700' : '500',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              transition: 'var(--transition)',
              borderBottom: isActive('/') ? '2px solid #f59e0b' : '2px solid transparent',
              paddingBottom: '0.2rem'
            }}>
              Home
            </Link>

            <Link to="/products" style={{
              color: isActive('/products') ? '#fbbf24' : '#cbd5e1',
              fontWeight: isActive('/products') ? '700' : '500',
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              transition: 'var(--transition)',
              borderBottom: isActive('/products') ? '2px solid #f59e0b' : '2px solid transparent',
              paddingBottom: '0.2rem'
            }}>
              Collections
            </Link>

            {isAdmin && (
              <Link to="/admin" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: isActive('/admin') ? '#fbbf24' : '#10b981',
                fontWeight: '700',
                fontSize: '0.9rem',
                background: 'rgba(16, 185, 129, 0.12)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}>
                <LayoutDashboard size={16} />
                Admin Suite
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            
            {/* Cart Icon Badge */}
            <Link to="/cart" style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f8fafc',
              transition: 'var(--transition)'
            }}>
              <ShoppingBag size={20} color="#fbbf24" />
              {totalItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                  color: '#07090e',
                  fontSize: '0.7rem',
                  fontWeight: '900',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)'
                }}>
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* User Auth state */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to="/profile" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-glass)',
                  color: '#f8fafc',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  {isAdmin ? <ShieldCheck size={18} color="#10b981" /> : <User size={18} color="#fbbf24" />}
                  <span>{user.name.split(' ')[0]}</span>
                </Link>

                <button onClick={() => { logout(); navigate('/'); }} style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)'
                }} title="Sign Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="glass-btn btn-primary" style={{ padding: '0.5rem 1.35rem', fontSize: '0.9rem' }}>
                Sign In
              </Link>
            )}

          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;
