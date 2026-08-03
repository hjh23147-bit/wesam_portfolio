import React from 'react';
import { motion } from 'framer-motion';

/**
 * NavigationOverlay - Floating navigation dots fixed on the right side of the screen
 * Labels appear smoothly to the left of dots in both Arabic and English.
 */
const WORLDS = [
  { key: 'gateway', label: 'Gateway', labelAr: 'البوابة', color: '#4f8fff' },
  { key: 'hero', label: 'Hero', labelAr: 'الرئيسية', color: '#4f8fff' },
  { key: 'about', label: 'About', labelAr: 'حول', color: '#6fa8ff' },
  { key: 'skills', label: 'Skills', labelAr: 'المهارات', color: '#4f8fff' },
  { key: 'portfolio', label: 'Portfolio', labelAr: 'المشاريع', color: '#4fff8f' },
  { key: 'blog', label: 'Blog', labelAr: 'المدونة', color: '#ffb84f' },
  { key: 'contact', label: 'Contact', labelAr: 'تواصل', color: '#4fa0ff' },
];

export default function NavigationOverlay({ currentWorld, onNavigate, isRtl }) {
  return (
    <div style={{
      position: 'fixed',
      right: '24px',
      left: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      {WORLDS.map((world, i) => {
        const isActive = currentWorld === i;
        return (
          <motion.button
            key={world.key}
            onClick={() => onNavigate(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: isActive ? '12px' : '8px',
              height: isActive ? '12px' : '8px',
              borderRadius: '50%',
              background: isActive ? world.color : 'rgba(79, 143, 255, 0.25)',
              border: `1px solid ${isActive ? world.color : 'rgba(79, 143, 255, 0.2)'}`,
              cursor: 'pointer',
              padding: 0,
              boxShadow: isActive ? `0 0 14px ${world.color}70` : 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
            title={isRtl ? world.labelAr : world.label}
          >
            {/* Active label positioned cleanly to the left of the dot */}
            {isActive && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: -16 }}
                style={{
                  position: 'absolute',
                  right: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '10px',
                  color: world.color,
                  fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  letterSpacing: isRtl ? '0px' : '1px',
                  whiteSpace: 'nowrap',
                  textShadow: `0 0 10px ${world.color}50`,
                  pointerEvents: 'none',
                }}
              >
                {isRtl ? world.labelAr : world.label}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
