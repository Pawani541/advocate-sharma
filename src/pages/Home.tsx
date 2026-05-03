import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const practiceAreas = [
  { icon: '⚖️', title: 'Criminal Defense', desc: 'Aggressive defense for all criminal matters including bail, trials & appeals.' },
  { icon: '🏠', title: 'Property Law', desc: 'Disputes, title verification, possession matters & real estate transactions.' },
  { icon: '👨‍👩‍👧', title: 'Family Law', desc: 'Divorce, custody, maintenance, matrimonial disputes & adoption.' },
  { icon: '🏢', title: 'Corporate Law', desc: 'Business formation, contracts, compliance & commercial disputes.' },
  { icon: '📋', title: 'Civil Litigation', desc: 'Representing clients in all civil court proceedings & appeals.' },
  { icon: '🛡️', title: 'Consumer Forum', desc: 'Consumer rights, deficiency of service & product liability cases.' },
  { icon: '📁', title: 'Service Matter', desc: 'Government service disputes, departmental proceedings, suspensions, promotions & service benefits.' },
];

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)' }}>
      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--dark-border)', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Scale size={28} color="var(--gold)" />
          <div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '16px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.02em' }}>Sharma Law Chambers</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mr. Manish Mani Sharma, Advocate</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Home', id: 'home' },
            { label: 'Services', id: 'services' },
            { label: 'Contact', id: 'contact' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.3s', padding: 0 }}
              onMouseEnter={e => (e.target as any).style.color = 'var(--gold)'}
              onMouseLeave={e => (e.target as any).style.color = 'var(--text-muted)'}
            >{item.label}</button>
          ))}
          {isAuthenticated ? (
            <button onClick={() => navigate(user?.role === 'admin' ? '/admin-dashboard' : '/client-dashboard')}
              style={{ background: 'var(--gold)', color: '#000', padding: '10px 24px', borderRadius: '4px', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
              Dashboard
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/login" style={{ color: 'var(--gold)', border: '1px solid var(--gold)', padding: '9px 20px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>Login</Link>
              <Link to="/register" style={{ background: 'var(--gold)', color: '#000', padding: '9px 20px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Register</Link>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '70px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.06) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: '400px', height: '400px', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', border: '1px solid rgba(201,168,76,0.07)', borderRadius: '50%' }} />
        <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '800px', padding: '0 40px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '100px', padding: '6px 20px', marginBottom: '30px', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Trusted Legal Counsel Since 2005
          </div>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
            <span style={{ color: 'var(--text-primary)' }}>Mr. </span>
            <span style={{ color: 'var(--gold)' }}>Manish Mani</span>
            <br /><span style={{ color: 'var(--text-primary)' }}>Sharma</span>
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', color: 'var(--text-muted)', marginBottom: '10px', fontStyle: 'italic' }}>Advocate & Legal Consultant</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '550px', margin: '0 auto 40px' }}>
            Providing exceptional legal representation with integrity, expertise, and unwavering commitment to justice across all courts of Uttar Pradesh & India.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <button onClick={() => navigate('/request-case')} style={{ background: 'var(--gold)', color: '#000', padding: '16px 40px', borderRadius: '4px', border: 'none', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                Submit Your Case <ChevronRight size={16} />
              </button>
            ) : (
              <Link to="/register" style={{ background: 'var(--gold)', color: '#000', padding: '16px 40px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em' }}>
                Consult Now
              </Link>
            )}
            <button onClick={() => scrollTo('contact')} style={{ border: '1px solid var(--dark-border)', color: 'var(--text-primary)', padding: '16px 40px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, background: 'none', cursor: 'pointer' }}>
              Contact Us
            </button>
          </div>
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '64px' }}>
            {[{ num: '20+', label: 'Years Experience' }, { num: '500+', label: 'Cases Won' }, { num: '98%', label: 'Success Rate' }, { num: '1000+', label: 'Happy Clients' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '32px', fontWeight: 700, color: 'var(--gold)' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '100px 80px', background: 'var(--dark-2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Practice Areas</div>
          <h2 style={{ fontSize: '42px', fontWeight: 700 }}>Areas of <span style={{ color: 'var(--gold)' }}>Expertise</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {practiceAreas.map((area, i) => (
            <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '32px', transition: 'border-color 0.3s, transform 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as any).style.borderColor = 'var(--gold)'; (e.currentTarget as any).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as any).style.borderColor = 'var(--dark-border)'; (e.currentTarget as any).style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{area.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px', color: 'var(--gold)' }}>{area.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7 }}>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '100px 80px', background: 'var(--dark)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Reach Out</div>
          <h2 style={{ fontSize: '42px', fontWeight: 700 }}>Get In <span style={{ color: 'var(--gold)' }}>Touch</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '24px', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: <Phone size={28} color="var(--gold)" />, label: 'Phone', value: '+91 94507 47030', href: 'tel:+919450747030' },
            { icon: <Mail size={28} color="var(--gold)" />, label: 'Email', value: 'manishmanisharma57@gmail.com', href: 'mailto:manishmanisharma57@gmail.com' },
            { icon: <MapPin size={28} color="var(--gold)" />, label: 'Chamber', value: 'E-Block 317, High Court, Lucknow', href: 'https://maps.google.com/?q=High+Court+Lucknow' },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)', borderRadius: '12px', padding: '36px 40px', textAlign: 'center', flex: '1', minWidth: '240px', textDecoration: 'none', display: 'block', transition: 'border-color 0.3s, transform 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as any).style.borderColor = 'var(--gold)'; (e.currentTarget as any).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as any).style.borderColor = 'var(--dark-border)'; (e.currentTarget as any).style.transform = 'translateY(0)'; }}>
              <div style={{ marginBottom: '14px' }}>{c.icon}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>{c.label}</div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '14px' }}>{c.value}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--dark-border)', padding: '32px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '16px' }}>Sharma Law Chambers</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2025 Mr. Manish Mani Sharma. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px' }}>Client Login</Link>
          <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '13px' }}>Register</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
