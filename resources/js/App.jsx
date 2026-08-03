import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './i18n';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import SceneManager from './3d/SceneManager';
import LoadingScreen from './ui/LoadingScreen';
import NavigationOverlay from './ui/NavigationOverlay';
import HUDOverlay from './ui/HUDOverlay';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

/**
 * ProtectedAdminRoute — Enforces session authentication
 * Redirects to /admin/login if user is not authenticated in active session.
 */
function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem('admin_session_token') || localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

/**
 * Main 3D Experience — The Multiverse Journey
 */
function MultiverseExperience() {
  const { lang, toggleLanguage, isRtl } = useLanguage();
  const [currentWorld, setCurrentWorld] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleWorldChange = useCallback((worldIndex) => {
    if (worldIndex >= 0 && worldIndex <= 6) {
      setCurrentWorld(worldIndex);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleWorldChange(Math.min(currentWorld + 1, 6));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleWorldChange(Math.max(currentWorld - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWorld, handleWorldChange]);

  // Ultra-fluid wheel navigation
  useEffect(() => {
    let lastWheelTime = 0;
    let accumulatedDelta = 0;

    const handleWheel = (e) => {
      const now = Date.now();
      accumulatedDelta += e.deltaY;

      if (now - lastWheelTime < 600) return;

      if (Math.abs(accumulatedDelta) > 40) {
        lastWheelTime = now;
        if (accumulatedDelta > 0) {
          handleWorldChange(Math.min(currentWorld + 1, 6));
        } else {
          handleWorldChange(Math.max(currentWorld - 1, 0));
        }
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentWorld, handleWorldChange]);

  // Fluid touch swipe navigation
  useEffect(() => {
    let touchStartY = 0;
    let lastSwipeTime = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const now = Date.now();
      if (now - lastSwipeTime < 600) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 35) {
        lastSwipeTime = now;
        if (deltaY > 0) {
          handleWorldChange(Math.min(currentWorld + 1, 6));
        } else {
          handleWorldChange(Math.max(currentWorld - 1, 0));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentWorld, handleWorldChange]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <SceneManager
        currentWorld={currentWorld}
        onWorldChange={handleWorldChange}
        lang={lang}
        isRtl={isRtl}
      />

      {showContent && (
        <>
          <NavigationOverlay
            currentWorld={currentWorld}
            onNavigate={handleWorldChange}
            isRtl={isRtl}
          />
          <HUDOverlay
            currentWorld={currentWorld}
            onToggleLanguage={toggleLanguage}
            isRtl={isRtl}
            lang={lang}
          />
        </>
      )}
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    );
  }

  return <MultiverseExperience />;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
