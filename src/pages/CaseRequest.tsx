import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, ArrowLeft } from 'lucide-react';

const caseTypes = ['Criminal Defense', 'Property Law', 'Family Law', 'Corporate Law', 'Civil Litigation', 'Consumer Forum', 'Labor Law', 'Immigration', 'Other'];

const CaseRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', type: '', court: '', description: '', urgency: 'normal', opposingParty: '', previousLawyer: 'no' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title || !form.type || !form.description) return;
    const cases = JSON.parse(localStorage.getItem('cases') || '[]');
    cases.push({ ...form, userId: user?.id, clientName: user?.name, clientEmail: user?.email, status: 'pending', date: new Date().toLocaleDateString('en-IN') });
    localStorage.setItem('cases', JSON.stringify(cases));
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <div style={{ fontSize: '64px' }}>??</div>
      <h2 style={{ fontFamily: 'Playfair Display', fontSize: '32px', color: 'var(--gold)' }}>Case Submitted!</h2>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px' }}>Your case request has been submitted. Mr. Manish Mani Sharma will review it and respond within 24-48 hours.</p>
      <button onClick={() => navigate('/client-dashboard')} style={{ background: 'var(--gold)', color: '#000', padding: '14px 32px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px' }}>Back to Dashboard</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        <button onClick={() => navigate('/client-dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Scale size={28} color="var(--gold)" />
          <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Submit Case Request</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Provide details about your legal matter for Mr. Manish Mani Sharma to review</p>
        <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Case Title *</label>
            <input name="title" placeholder="Brief title of your case" value={form.title} onChange={handleChange} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Case Type *</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="">Select type</option>
                {caseTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Urgency Level</label>
              <select name="urgency" value={form.urgency} onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="very-urgent">Very Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Court / Jurisdiction</label>
            <input name="court" placeholder="e.g., Punjab & Haryana High Court, District Court Chandigarh" value={form.court} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Opposing Party</label>
            <input name="opposingParty" placeholder="Name of opposing party (if applicable)" value={form.opposingParty} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Case Description *</label>
            <textarea name="description" placeholder="Describe your legal matter in detail. Include relevant dates, events, documents involved, and what outcome you seek..." value={form.description} onChange={handleChange} rows={6} />
          </div>
          <button onClick={handleSubmit} style={{ background: 'var(--gold)', color: '#000', padding: '16px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', marginTop: '8px' }}>
            Submit Case Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseRequest;
