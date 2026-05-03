import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate(email === 'admin@sharmalaw.in' ? '/admin-dashboard' : '/client-dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--dark)' }}>
      <div style={{ flex: 1, display: 'none', background: 'var(--dark-2)', borderRight: '1px solid var(--dark-border)', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }} className="left-panel">
        <Scale size={60} color="var(--gold)" />
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '36px', color: 'var(--gold)', textAlign: 'center' }}>MMS Law<br/>Chambers</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '300px', lineHeight: 1.7 }}>Justice served with integrity, expertise, and unwavering commitment.</p>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <Scale size={28} color="var(--gold)" />
            <span style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '18px' }}>Sharma Law Chambers</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '14px' }}>Sign in to your account to continue</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()} style={{ paddingRight: '48px' }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <div style={{ color: '#ff6b6b', fontSize: '13px', background: 'rgba(255,107,107,0.1)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,107,107,0.2)' }}>{error}</div>}
            <button onClick={handleSubmit} disabled={loading} style={{ background: 'var(--gold)', color: '#000', padding: '14px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', marginTop: '8px' }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold)' }}>Admin:</strong> admin@sharmalaw.in / sharma
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Register here</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: '12px' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px' }}>? Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
