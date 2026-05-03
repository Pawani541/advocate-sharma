import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, FileText, Calendar, Users, CheckCircle, XCircle, LogOut, Camera } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [tab, setTab] = useState<'cases' | 'meetings' | 'clients'>('cases');
  const [clients, setClients] = useState<any[]>([]);
  const [photo, setPhoto] = useState<string>(localStorage.getItem('advocatePhoto') || '');

  useEffect(() => {
    setCases(JSON.parse(localStorage.getItem('cases') || '[]'));
    setMeetings(JSON.parse(localStorage.getItem('meetings') || '[]'));
    setClients(JSON.parse(localStorage.getItem('users') || '[]'));
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      localStorage.setItem('advocatePhoto', result);
      setPhoto(result);
    };
    reader.readAsDataURL(file);
  };

  const updateStatus = (type: 'cases' | 'meetings', id: number, status: string) => {
    if (type === 'cases') {
      const updated = cases.map((c, i) => i === id ? { ...c, status } : c);
      setCases(updated); localStorage.setItem('cases', JSON.stringify(updated));
    } else {
      const updated = meetings.map((m, i) => i === id ? { ...m, status } : m);
      setMeetings(updated); localStorage.setItem('meetings', JSON.stringify(updated));
    }
  };

  const statusColor = (s: string) => s === 'approved' ? '#22c55e' : s === 'rejected' ? '#ef4444' : 'var(--gold)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex' }}>
      <aside style={{ width: '260px', background: 'var(--dark-2)', borderRight: '1px solid var(--dark-border)', padding: '32px 24px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <Scale size={24} color="var(--gold)" />
          <span style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '15px' }}>Sharma Law - Admin</span>
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '72px', height: '72px', margin: '0 auto 12px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--gold)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--gold)' }}>
              {photo ? (
                <img src={photo} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#000' }}>M</span>
              )}
            </div>
            <label htmlFor="admin-photo-upload" style={{ position: 'absolute', bottom: '0px', right: '0px', background: 'var(--gold)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #0a0a0f' }}>
              <Camera size={12} color="#000" />
            </label>
            <input id="admin-photo-upload" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: '4px' }}>ADMINISTRATOR</div>
          <div style={{ fontWeight: 700, fontSize: '15px', fontFamily: 'Playfair Display' }}>Mr. Manish Mani Sharma</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>Advocate</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '6px' }}>Click camera to update photo</div>
        </div>
        {[
          { key: 'cases', icon: <FileText size={18} />, label: 'Case Requests', count: cases.filter(c => c.status === 'pending').length },
          { key: 'meetings', icon: <Calendar size={18} />, label: 'Meeting Requests', count: meetings.filter(m => m.status === 'pending').length },
          { key: 'clients', icon: <Users size={18} />, label: 'All Clients', count: clients.length },
        ].map(item => (
          <button key={item.key} onClick={() => setTab(item.key as any)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', color: tab === item.key ? 'var(--gold)' : 'var(--text-muted)', background: tab === item.key ? 'rgba(201,168,76,0.1)' : 'transparent', border: 'none', padding: '12px 16px', borderRadius: '8px', marginBottom: '8px', fontSize: '14px', cursor: 'pointer', width: '100%', textAlign: 'left', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{item.icon} {item.label}</div>
            {item.count > 0 && <span style={{ background: 'var(--gold)', color: '#000', fontSize: '11px', padding: '2px 8px', borderRadius: '100px', fontWeight: 700 }}>{item.count}</span>}
          </button>
        ))}
        <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'none', border: 'none', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: 'auto', width: '100%' }}>
          <LogOut size={18} /> Sign Out
        </button>
      </aside>
      <main style={{ marginLeft: '260px', flex: 1, padding: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Sharma Panel</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Manage case requests, meetings, and clients</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {[
            { label: 'Total Cases', value: cases.length, color: 'var(--gold)' },
            { label: 'Pending Cases', value: cases.filter(c => c.status === 'pending').length, color: '#f59e0b' },
            { label: 'Total Meetings', value: meetings.length, color: 'var(--gold)' },
            { label: 'Total Clients', value: clients.length, color: '#22c55e' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Playfair Display', color: s.color }}>{s.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {tab === 'cases' && (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>Case Requests</h2>
            {cases.length === 0 ? <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center', background: 'var(--dark-card)', borderRadius: '12px', border: '1px solid var(--dark-border)' }}>No cases submitted yet</div> :
              cases.map((c, i) => (
                <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '17px', marginBottom: '4px' }}>{c.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{c.clientName} • {c.type} • {c.date}</div>
                    </div>
                    <div style={{ color: statusColor(c.status), background: `${statusColor(c.status)}22`, padding: '5px 14px', borderRadius: '100px', fontSize: '12px', textTransform: 'capitalize', fontWeight: 600 }}>{c.status}</div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>{c.description}</p>
                  {c.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => updateStatus('cases', i, 'approved')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button onClick={() => updateStatus('cases', i, 'rejected')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            }
          </>
        )}

        {tab === 'meetings' && (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>Meeting Requests</h2>
            {meetings.length === 0 ? <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center', background: 'var(--dark-card)', borderRadius: '12px', border: '1px solid var(--dark-border)' }}>No meetings requested yet</div> :
              meetings.map((m, i) => (
                <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '17px', marginBottom: '4px' }}>{m.purpose}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{m.clientName} • {m.preferredDate} at {m.preferredTime}</div>
                    </div>
                    <div style={{ color: statusColor(m.status), background: `${statusColor(m.status)}22`, padding: '5px 14px', borderRadius: '100px', fontSize: '12px', textTransform: 'capitalize', fontWeight: 600 }}>{m.status}</div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>{m.notes}</p>
                  {m.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => updateStatus('meetings', i, 'approved')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                        <CheckCircle size={16} /> Confirm
                      </button>
                      <button onClick={() => updateStatus('meetings', i, 'rejected')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                        <XCircle size={16} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))
            }
          </>
        )}

        {tab === 'clients' && (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>Registered Clients</h2>
            {clients.length === 0 ? <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center', background: 'var(--dark-card)', borderRadius: '12px', border: '1px solid var(--dark-border)' }}>No clients registered yet</div> :
              clients.map((c: any, i: number) => (
                <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '24px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{c.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{c.email} • {c.phone}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gold)' }}>{c.occupation || 'Client'}</div>
                </div>
              ))
            }
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;