import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, Plus, Calendar, FileText, CheckCircle, LogOut, User } from 'lucide-react';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [photo, setPhoto] = useState<string>(localStorage.getItem('advocatePhoto') || '');

  useEffect(() => {
    const allCases = JSON.parse(localStorage.getItem('cases') || '[]');
    const allMeetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    setCases(allCases.filter((c: any) => c.userId === user?.id));
    setMeetings(allMeetings.filter((m: any) => m.userId === user?.id));
    const handleStorage = () => setPhoto(localStorage.getItem('advocatePhoto') || '');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [user]);

  const statusColor = (s: string) => s === 'approved' ? '#22c55e' : s === 'rejected' ? '#ef4444' : 'var(--gold)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex' }}>
      <aside style={{ width: '260px', background: 'var(--dark-2)', borderRight: '1px solid var(--dark-border)', padding: '32px 24px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <Scale size={24} color="var(--gold)" />
          <span style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '15px' }}>Sharma Law</span>
        </div>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '10px', padding: '20px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', overflow: 'hidden', border: '2px solid var(--gold)' }}>
            {photo ? (
              <img src={photo} alt="Advocate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={28} color="#000" />
            )}
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>{user?.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Client</div>
        </div>
        {[
          { to: '/request-case', icon: <Plus size={18} />, label: 'Submit New Case' },
          { to: '/request-meeting', icon: <Calendar size={18} />, label: 'Schedule Meeting' },
          { to: '/profile', icon: <User size={18} />, label: 'My Profile' },
        ].map(item => (
          <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', marginBottom: '8px', fontSize: '14px', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as any).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as any).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as any).style.background = 'transparent'; (e.currentTarget as any).style.color = 'var(--text-muted)'; }}>
            {item.icon} {item.label}
          </Link>
        ))}
        <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'none', border: 'none', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: 'auto', width: '100%' }}>
          <LogOut size={18} /> Sign Out
        </button>
      </aside>
      <main style={{ marginLeft: '260px', flex: 1, padding: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>My Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Track your cases and meeting requests</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
          {[
            { label: 'Total Cases', value: cases.length, icon: <FileText size={24} color="var(--gold)" /> },
            { label: 'Meetings Requested', value: meetings.length, icon: <Calendar size={24} color="var(--gold)" /> },
            { label: 'Approved Cases', value: cases.filter(c => c.status === 'approved').length, icon: <CheckCircle size={24} color="#22c55e" /> },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '28px' }}>
              <div style={{ marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'Playfair Display' }}>{s.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>My Cases</h2>
        {cases.length === 0 ? (
          <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No cases submitted yet. <Link to="/request-case" style={{ color: 'var(--gold)' }}>Submit your first case →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cases.map((c, i) => (
              <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{c.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{c.type} • {c.date}</div>
                </div>
                <div style={{ color: statusColor(c.status), background: `${statusColor(c.status)}22`, padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{c.status}</div>
              </div>
            ))}
          </div>
        )}
        <h2 style={{ fontSize: '22px', fontWeight: 600, margin: '40px 0 20px' }}>My Meetings</h2>
        {meetings.length === 0 ? (
          <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No meetings requested yet. <Link to="/request-meeting" style={{ color: 'var(--gold)' }}>Schedule a meeting →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {meetings.map((m, i) => (
              <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{m.purpose}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{m.preferredDate} at {m.preferredTime}</div>
                </div>
                <div style={{ color: statusColor(m.status), background: `${statusColor(m.status)}22`, padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{m.status}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;