import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * PerformanceMonitor - Dynamically adjusts rendering quality
 * based on real-time FPS measurements to maintain smooth experience.
 */
export default function PerformanceMonitor({ children }) {
  const { gl } = useThree();
  const frameTimesRef = useRef([]);
  const lastTimeRef = useRef(performance.now());
  const qualityRef = useRef(1.0);
  const adjustCooldownRef = useRef(0);

  useFrame(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;

    frameTimesRef.current.push(delta);
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift();
    }

    adjustCooldownRef.current -= delta;
    if (adjustCooldownRef.current > 0) return;

    if (frameTimesRef.current.length >= 30) {
      const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      const fps = 1000 / avgFrameTime;

      if (fps < 25 && qualityRef.current > 0.5) {
        qualityRef.current = Math.max(0.5, qualityRef.current - 0.15);
        gl.setPixelRatio(Math.max(1, window.devicePixelRatio * qualityRef.current));
        adjustCooldownRef.current = 3000;
      } else if (fps > 55 && qualityRef.current < 1.0) {
        qualityRef.current = Math.min(1.0, qualityRef.current + 0.1);
        gl.setPixelRatio(Math.min(2, window.devicePixelRatio * qualityRef.current));
        adjustCooldownRef.current = 3000;
      }
    }
  });

  return <>{children}</>;
}

/**
 * Hook to get current quality level for components that need
 * to scale their own complexity (particle counts, etc.)
 */
export function useQuality() {
  const [quality, setQuality] = useState(1.0);
  
  useEffect(() => {
    // Check if device is likely low-power
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (ctx) {
      const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Common integrated GPUs - reduce quality
        if (/Intel|Mali|Adreno|Apple GPU/i.test(renderer)) {
          setQuality(0.7);
        }
      }
    }
    canvas.remove();
  }, []);

  return quality;
}
