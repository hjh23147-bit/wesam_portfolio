import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HUDOverlay - Fixed header controls, world indicator, language toggle, and Admin Portal link.
 */
const WORLD_NAMES = {
  en: ['The Gateway', 'Hero Universe', 'The Core', 'Tech Galaxy', 'Research Labs', 'Cosmic Library', 'Space Station'],
  ar: ['البوابة الفضائية', 'المدينة الرقمية', 'النواة الزجاجية', 'المجرة التقنية', 'مركز الأبحاث', 'المكتبة الكونية', 'محطة التواصل'],
};

export default function HUDOverlay({ currentWorld, onToggleLanguage, isRtl, lang }) {
  const [showWorldName, setShowWorldName] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    setShowWorldName(true);
    const timer = setTimeout(() => setShowWorldName(false), 3000);
    return () => clearTimeout(timer);
  }, [currentWorld]);

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(false);
    const handleWheel = () => setShowScrollHint(false);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleAdminClick = () => {
    // Clear any previous active admin session so entering always requires email & password
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_session_token');
  };

  const worldName = lang === 'ar'
    ? WORLD_NAMES.ar[currentWorld]
    : WORLD_NAMES.en[currentWorld];

  return (
    <>
      {/* Admin Login Portal Button fixed in top-left */}
      <motion.a
        href="/admin/login"
        onClick={handleAdminClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 100,
          padding: '8px 16px',
          background: 'rgba(5, 10, 25, 0.75)',
          border: '1px solid rgba(79, 143, 255, 0.35)',
          borderRadius: '10px',
          color: '#80b0ff',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
          textDecoration: 'none',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 18px rgba(79, 143, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.3s',
        }}
        title={isRtl ? 'تسجيل دخول الإدارة المحمي' : 'Protected Admin Login'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f8fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>{isRtl ? 'الإدارة' : 'Admin'}</span>
      </motion.a>

      {/* World name indicator centered at top */}
      <AnimatePresence>
        {showWorldName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
              fontSize: isRtl ? '12px' : '11px',
              fontWeight: 700,
              color: 'rgba(160, 200, 255, 0.8)',
              letterSpacing: isRtl ? '1px' : '4px',
              textTransform: 'uppercase',
              textShadow: '0 0 15px rgba(79, 143, 255, 0.4)',
              pointerEvents: 'none',
            }}
          >
            {worldName}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language toggle fixed in top-right */}
      <motion.button
        onClick={onToggleLanguage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          padding: '8px 16px',
          background: 'rgba(5, 10, 25, 0.75)',
          border: '1px solid rgba(79, 143, 255, 0.3)',
          borderRadius: '10px',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: "'Space Grotesk', 'Cairo', sans-serif",
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 15px rgba(79, 143, 255, 0.2)',
          transition: 'all 0.3s',
        }}
      >
        {lang === 'ar' ? 'EN' : 'عربي'}
      </motion.button>

      {/* Scroll hint centered at bottom */}
      <AnimatePresence>
        {showScrollHint && currentWorld === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '36px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '20px',
                height: '32px',
                border: '1.5px solid rgba(79, 143, 255, 0.4)',
                borderRadius: '10px',
                margin: '0 auto 8px',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ y: [2, 10, 2], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '3px',
                  height: '6px',
                  background: '#4f8fff',
                  borderRadius: '2px',
                  position: 'absolute',
                  left: '50%',
                  top: '6px',
                  transform: 'translateX(-50%)',
                }}
              />
            </motion.div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(140, 180, 255, 0.5)',
              letterSpacing: '3px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              SCROLL
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* World counter fixed in bottom-left */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 100,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        fontWeight: 700,
        color: 'rgba(160, 200, 255, 0.4)',
        letterSpacing: '1px',
      }}>
        {String(currentWorld + 1).padStart(2, '0')} / 07
      </div>
    </>
  );
}
