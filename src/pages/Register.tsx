import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', address: '', occupation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.phone || !form.password) return setError('All fields are required.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    const ok = await register(form);
    setLoading(false);
    if (ok) navigate('/login');
    else setError('Email already registered.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', justifyContent: 'center' }}>
          <Scale size={28} color="var(--gold)" />
          <span style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '18px' }}>MMS Law Chambers</span>
        </div>
        <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '16px', padding: '48px 40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '36px', fontSize: '14px', textAlign: 'center' }}>Register as a client to submit cases & schedule meetings</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
              { name: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
              { name: 'email', label: 'Email Address', placeholder: 'john@email.com', type: 'email', full: true },
              { name: 'occupation', label: 'Occupation', placeholder: 'Business Owner', type: 'text', full: true },
              { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
              { name: 'confirm', label: 'Confirm Password', placeholder: '••••••••', type: 'password' },
            ].map(f => (
              <div key={f.name} style={{ gridColumn: (f as any).full ? '1 / -1' : 'auto' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>
          {error && <div style={{ color: '#ff6b6b', fontSize: '13px', background: 'rgba(255,107,107,0.1)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,107,107,0.2)', marginTop: '16px' }}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: 'var(--gold)', color: '#000', padding: '14px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px', marginTop: '24px' }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
            Already registered? <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px' }}>? Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
