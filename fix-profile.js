const fs = require('fs');

const profile = `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Camera, User } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(localStorage.getItem('profilePhoto_' + user?.id) || '');

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      localStorage.setItem('profilePhoto_' + user?.id, result);
      setPhoto(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '96px', margin: '0 auto 24px' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid var(--gold)' }}>
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={40} color="#000" />
              )}
            </div>
            <label style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--gold)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--dark-card)' }}>
              <Camera size={14} color="#000" />
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
            </label>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{user?.name}</h1>
          <div style={{ color: 'var(--gold)', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{user?.role}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '32px' }}>Click the camera icon to update your photo</div>
          {[{ label: 'Email', value: user?.email }, { label: 'Phone', value: (user as any)?.phone || 'Not provided' }, { label: 'Occupation', value: (user as any)?.occupation || 'Not provided' }].map(f => (
            <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--dark-border)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{f.label}</span>
              <span style={{ fontSize: '14px' }}>{f.value}</span>
            </div>
          ))}
          <button onClick={() => { logout(); navigate('/'); }} style={{ width: '100%', marginTop: '32px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
`;

fs.writeFileSync('src/pages/Profile.tsx', profile, 'utf8');
console.log('Profile.tsx updated!');