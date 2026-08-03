import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingScreen - Cinematic loading screen with progress bar
 * Styled as part of the Gateway world aesthetic.
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate progressive loading
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(() => onComplete?.(), 600);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#030014',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {/* Floating particles behind */}
          <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}>
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  position: 'absolute',
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  background: '#4f8fff',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px #4f8fff',
                }}
              />
            ))}
          </div>

          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <div style={{
              fontSize: '12px',
              color: '#6fa8ff',
              letterSpacing: '8px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Initializing
            </div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(135deg, #4f8fff, #80b0ff, #a0d0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              The Multiverse
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: '280px',
            position: 'relative',
          }}>
            {/* Track */}
            <div style={{
              height: '2px',
              background: 'rgba(79, 143, 255, 0.1)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}>
              {/* Fill */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #2060cc, #4f8fff, #80b0ff)',
                  borderRadius: '1px',
                  boxShadow: '0 0 15px rgba(79, 143, 255, 0.5)',
                }}
              />
            </div>

            {/* Percentage */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
              fontSize: '10px',
              color: 'rgba(140, 180, 255, 0.4)',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span>LOADING ASSETS</span>
              <span>{Math.round(Math.min(progress, 100))}%</span>
            </div>
          </div>

          {/* Subtle system text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '9px',
              color: 'rgba(140, 180, 255, 0.3)',
              letterSpacing: '3px',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            WESAM AL-NATHARI • SYSTEMS ARCHITECT
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
