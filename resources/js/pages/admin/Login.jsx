import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { isRtl } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await adminLogin(email, password);
      if (res.token) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || (isRtl ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#030014',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
      direction: isRtl ? 'rtl' : 'ltr',
    }}>
      {/* Return to Multiverse Portfolio Button */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: '24px',
          left: isRtl ? 'auto' : '24px',
          right: isRtl ? '24px' : 'auto',
          color: 'rgba(160, 200, 255, 0.7)',
          fontSize: '12px',
          fontWeight: 700,
          textDecoration: 'none',
          padding: '8px 16px',
          background: 'rgba(5, 10, 25, 0.6)',
          border: '1px solid rgba(79, 143, 255, 0.25)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s',
        }}
      >
        ← {isRtl ? 'العودة للموقع الرئيسي' : 'Return to Portfolio'}
      </a>

      {/* Admin Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(8, 15, 35, 0.85)',
        border: '1px solid rgba(79, 143, 255, 0.3)',
        borderRadius: '20px',
        padding: '36px 32px',
        boxShadow: '0 0 40px rgba(79, 143, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
      }}>
        {/* Shield Icon */}
        <div style={{
          width: '52px',
          height: '52px',
          margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #2060cc, #4080ff)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(79, 143, 255, 0.4)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          {isRtl ? 'تسجيل دخول الإدارة' : 'Management Security Portal'}
        </h2>

        <p style={{
          fontSize: '12px',
          color: 'rgba(160, 200, 255, 0.7)',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>
          {isRtl
            ? 'صفحة الإدارة مخصصة ومحمية، تتطلب إدخال اسم المستخدم وكلمة المرور في كل محاولة دخول.'
            : 'Isolated management portal requiring authentication for access.'}
        </p>

        {error && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(255, 79, 79, 0.15)',
            border: '1px solid rgba(255, 79, 79, 0.4)',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#ff6b6b',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: isRtl ? 'right' : 'left' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 700,
              color: 'rgba(200, 225, 255, 0.85)',
              marginBottom: '6px',
            }}>
              {isRtl ? 'اسم المستخدم / البريد الإلكتروني' : 'Username / Email'}
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 700,
              color: 'rgba(200, 225, 255, 0.85)',
              marginBottom: '6px',
            }}>
              {isRtl ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '14px',
              background: 'linear-gradient(135deg, #2060cc, #4080ff)',
              color: '#ffffff',
              border: '1px solid rgba(79, 143, 255, 0.4)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
              boxShadow: '0 0 25px rgba(79, 143, 255, 0.35)',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s',
            }}
          >
            {loading
              ? (isRtl ? 'جاري المصادقة والتحقق...' : 'Authenticating...')
              : (isRtl ? '🔒 دخول قسم الإدارة' : '🔒 Login to Dashboard')}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(5, 10, 25, 0.8)',
  border: '1px solid rgba(79, 143, 255, 0.25)',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};
