import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * TransitionSystem - Handles visual transitions between worlds
 * Provides hyperspace warp lines and tunnel effects driven by GSAP.
 */
export default function TransitionSystem({ active, type = 'hyperspace', progress = 0, color = '#4f8fff' }) {
  if (!active) return null;

  return (
    <>
      {type === 'hyperspace' && <HyperspaceWarp progress={progress} color={color} />}
      {type === 'tunnel' && <LightTunnel progress={progress} color={color} />}
    </>
  );
}

function HyperspaceWarp({ progress, color }) {
  const linesRef = useRef();
  const count = 200;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const velocities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * 100 - 50;
      
      // Line start
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      // Line end (same point initially)
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z;
      
      velocities[i] = Math.random() * 2 + 1;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current) return;
    const geo = linesRef.current.geometry;
    const pos = geo.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const speed = velocities[i] * progress * 80;
      
      // Move start point
      pos[i * 6 + 2] -= speed * delta;
      // Stretch end point behind
      pos[i * 6 + 5] = pos[i * 6 + 2] + speed * delta * 3 * progress;

      // Reset if passed camera
      if (pos[i * 6 + 2] < -50) {
        pos[i * 6 + 2] = 50;
        pos[i * 6 + 5] = 50;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={progress * 0.8}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function LightTunnel({ progress, color }) {
  const groupRef = useRef();
  const ringCount = 30;

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      z: -i * 4,
      scale: 1 + i * 0.1,
      rotation: i * 0.2,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((ring, i) => {
      ring.position.z += progress * 20 * delta;
      ring.rotation.z += delta * 0.5;
      if (ring.position.z > 10) {
        ring.position.z = -ringCount * 4;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
          <torusGeometry args={[3 + ring.scale, 0.03, 8, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={progress * 0.6 * (1 - i / ringCount)}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
