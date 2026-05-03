import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, ArrowLeft } from 'lucide-react';

const MeetingRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ purpose: '', preferredDate: '', preferredTime: '', alternateDate: '', mode: 'in-person', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.purpose || !form.preferredDate || !form.preferredTime) return;
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    meetings.push({ ...form, userId: user?.id, clientName: user?.name, clientEmail: user?.email, status: 'pending', submittedOn: new Date().toLocaleDateString('en-IN') });
    localStorage.setItem('meetings', JSON.stringify(meetings));
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <div style={{ fontSize: '64px' }}>??</div>
      <h2 style={{ fontFamily: 'Playfair Display', fontSize: '32px', color: 'var(--gold)' }}>Meeting Requested!</h2>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px' }}>Your meeting request has been sent. Mr. Manish Mani Sharma's office will confirm the appointment shortly.</p>
      <button onClick={() => navigate('/client-dashboard')} style={{ background: 'var(--gold)', color: '#000', padding: '14px 32px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px' }}>Back to Dashboard</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '580px' }}>
        <button onClick={() => navigate('/client-dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Calendar size={28} color="var(--gold)" />
          <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Schedule a Meeting</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Request a consultation with Mr. Manish Mani Sharma</p>
        <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Meeting Purpose *</label>
            <input name="purpose" placeholder="e.g., Initial consultation for property dispute" value={form.purpose} onChange={handleChange} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Preferred Date *</label>
              <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Preferred Time *</label>
              <input name="preferredTime" type="time" value={form.preferredTime} onChange={handleChange} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Alternate Date</label>
              <input name="alternateDate" type="date" value={form.alternateDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Meeting Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange}>
                <option value="in-person">In-Person (Chambers)</option>
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Additional Notes</label>
            <textarea name="notes" placeholder="Any additional information or special requirements..." value={form.notes} onChange={handleChange} rows={4} />
          </div>
          <button onClick={handleSubmit} style={{ background: 'var(--gold)', color: '#000', padding: '16px', borderRadius: '6px', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', marginTop: '8px' }}>
            Request Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequest;
