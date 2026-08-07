import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, User, ShieldAlert, KeyRound, ArrowRight, Gem } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Mentor Review Helper Button to auto-fill Admin Credentials
  const fillAdminCredentials = () => {
    setIsLogin(true);
    setEmail('admin@gmail.com');
    setPassword('admin123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password, mobile });
      }
      navigate(redirect);
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || 'Authentication failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
      
      <div className="glass-panel" style={{ width: '100%', maxWidth: '490px', padding: '2.75rem', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)', marginBottom: '0.75rem' }}>
            <Gem size={26} color="#07090e" />
          </div>
          <h2 style={{ fontSize: '2rem', color: '#fff', fontFamily: "'Cinzel', serif" }}>LUMINA Portal</h2>
        </div>

        {/* Mentor Evaluation Helper Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.75rem',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#fbbf24', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
            <ShieldAlert size={16} /> MENTOR REVIEW QUICK LOGIN
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
            Click below to auto-fill pre-configured Lumina admin suite credentials:
          </p>
          <button
            type="button"
            onClick={fillAdminCredentials}
            className="glass-btn"
            style={{
              width: '100%',
              padding: '0.55rem',
              fontSize: '0.85rem',
              background: 'rgba(245, 158, 11, 0.25)',
              color: '#fffbeb',
              borderColor: 'rgba(245, 158, 11, 0.5)',
              fontWeight: '800'
            }}
          >
            <KeyRound size={15} /> Fill Admin: admin@gmail.com / admin123
          </button>
        </div>

        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'transparent',
              border: 'none',
              borderBottom: isLogin ? '2px solid #f59e0b' : '2px solid transparent',
              color: isLogin ? '#fbbf24' : 'var(--text-muted)',
              fontWeight: '800',
              fontSize: '1.05rem',
              fontFamily: "'Cinzel', serif",
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'transparent',
              border: 'none',
              borderBottom: !isLogin ? '2px solid #f59e0b' : '2px solid transparent',
              color: !isLogin ? '#fbbf24' : 'var(--text-muted)',
              fontWeight: '800',
              fontSize: '1.05rem',
              fontFamily: "'Cinzel', serif",
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Patron Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#fbbf24" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#fbbf24" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                placeholder="admin@gmail.com or patron@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#fbbf24" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="glass-btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '800', marginTop: '0.5rem' }}
          >
            {submitting ? 'Authenticating...' : isLogin ? 'Access Lumina Account' : 'Create Lumina Account'} <ArrowRight size={18} color="#07090e" />
          </button>

        </form>

      </div>

    </div>
  );
};

export default AuthPage;
