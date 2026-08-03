import React, { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

import CameraController, { WORLD_SPACING } from './CameraController';
import PostProcessingRig from './PostProcessingRig';
import PerformanceMonitor from './PerformanceMonitor';
import TransitionSystem from './TransitionSystem';

import World1Gateway from '../worlds/World1Gateway';
import World2Hero from '../worlds/World2Hero';
import World3About from '../worlds/World3About';
import World4Skills from '../worlds/World4Skills';
import World5Portfolio from '../worlds/World5Portfolio';
import World6Blog from '../worlds/World6Blog';
import World7Contact from '../worlds/World7Contact';

const WORLD_KEYS = ['gateway', 'hero', 'about', 'skills', 'portfolio', 'blog', 'contact'];

function SceneContent({ currentWorld, mousePosition, scrollProgress, onWorldChange, lang, isRtl }) {
  const [transition, setTransition] = useState({ active: false, type: 'hyperspace', progress: 0 });

  return (
    <>
      <PerformanceMonitor>
        <CameraController
          currentWorld={currentWorld}
          mousePosition={mousePosition}
          scrollProgress={scrollProgress}
        />

        {/* Ambient scene lighting */}
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f8fff" />

        {/* Fog tuned for depth without obscuring active content */}
        <fog attach="fog" args={['#030014', 15, 60]} />

        {/* World 0: Gateway (Z = 0) */}
        <group position={[0, 0, 0]}>
          {(currentWorld === 0 || currentWorld === 1) && (
            <World1Gateway 
              active={currentWorld === 0}
              onEnter={() => onWorldChange(1)} 
            />
          )}
        </group>

        {/* World 1: Hero (Z = -50) */}
        <group position={[0, 0, -WORLD_SPACING]}>
          {(currentWorld === 1 || currentWorld === 0 || currentWorld === 2) && (
            <World2Hero 
              active={currentWorld === 1} 
              mousePosition={mousePosition}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        {/* World 2: About (Z = -100) */}
        <group position={[0, 0, -WORLD_SPACING * 2]}>
          {(currentWorld === 2 || currentWorld === 1 || currentWorld === 3) && (
            <World3About 
              active={currentWorld === 2}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        {/* World 3: Skills (Z = -150) */}
        <group position={[0, 0, -WORLD_SPACING * 3]}>
          {(currentWorld === 3 || currentWorld === 2 || currentWorld === 4) && (
            <World4Skills 
              active={currentWorld === 3}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        {/* World 4: Portfolio (Z = -200) */}
        <group position={[0, 0, -WORLD_SPACING * 4]}>
          {(currentWorld === 4 || currentWorld === 3 || currentWorld === 5) && (
            <World5Portfolio 
              active={currentWorld === 4}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        {/* World 5: Blog (Z = -250) */}
        <group position={[0, 0, -WORLD_SPACING * 5]}>
          {(currentWorld === 5 || currentWorld === 4 || currentWorld === 6) && (
            <World6Blog 
              active={currentWorld === 5}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        {/* World 6: Contact (Z = -300) */}
        <group position={[0, 0, -WORLD_SPACING * 6]}>
          {(currentWorld === 6 || currentWorld === 5) && (
            <World7Contact 
              active={currentWorld === 6}
              lang={lang}
              isRtl={isRtl}
            />
          )}
        </group>

        <TransitionSystem
          active={transition.active}
          type={transition.type}
          progress={transition.progress}
        />

        <PostProcessingRig worldKey={WORLD_KEYS[currentWorld]} />
      </PerformanceMonitor>

      <Preload all />
    </>
  );
}

export default function SceneManager({ currentWorld, onWorldChange, lang, isRtl }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef();

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 16], fov: 55, near: 0.1, far: 500 }}
        style={{ background: '#030014' }}
      >
        <Suspense fallback={null}>
          <SceneContent
            currentWorld={currentWorld}
            mousePosition={mousePosition}
            scrollProgress={scrollProgress}
            onWorldChange={onWorldChange}
            lang={lang}
            isRtl={isRtl}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { WORLD_KEYS };
