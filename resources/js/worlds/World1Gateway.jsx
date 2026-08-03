import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * PortalAvatar - Renders Wesam's photo (we.jpg) inside the portal circle
 */
function PortalAvatar() {
  const texture = useTexture('/we.jpg');

  return (
    <group position={[0, 0, -4.9]}>
      {/* Circular User Avatar Photo */}
      <mesh>
        <circleGeometry args={[4.1, 64]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* Subtle overlay tint & glow for seamless integration */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[4.1, 64]} />
        <meshBasicMaterial
          color="#2060cc"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Avatar Border Ring */}
      <mesh position={[0, 0, 0.03]}>
        <torusGeometry args={[4.12, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#80b0ff"
          emissive="#4080ff"
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  );
}

/**
 * World 1: The Gateway
 * Deep 3D space with volumetric fog, floating light particles,
 * monolithic portal, and Wesam's photo in the center.
 */
export default function World1Gateway({ active, onEnter }) {
  const portalRef = useRef();
  const particlesRef = useRef();
  const portalRingRef = useRef();
  const glowRef = useRef();
  const groupRef = useRef();

  // Generate star field particles
  const starPositions = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sizes[i] = Math.random() * 2 + 0.5;

      const brightness = Math.random() * 0.5 + 0.5;
      colors[i * 3] = brightness * 0.7;
      colors[i * 3 + 1] = brightness * 0.8;
      colors[i * 3 + 2] = brightness;
    }
    return { positions, sizes, colors };
  }, []);

  // Floating particles near portal
  const floatingParticles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 12 + 3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 3 + 1;
    }
    return { positions, sizes };
  }, []);

  // Portal animation
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (portalRingRef.current) {
      portalRingRef.current.rotation.z = t * 0.3;
    }
    if (portalRef.current) {
      portalRef.current.rotation.z = -t * 0.15;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.15;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(t + i * 0.1) * 0.003;
        positions[i * 3] += Math.cos(t * 0.5 + i * 0.2) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handleEnter = () => {
    if (portalRef.current) {
      gsap.to(portalRef.current.scale, {
        x: 5, y: 5, z: 5,
        duration: 1.5,
        ease: 'power3.in',
        onComplete: onEnter,
      });
      gsap.to(portalRef.current.material, {
        opacity: 0,
        duration: 1.5,
      });
    } else {
      onEnter?.();
    }
  };

  return (
    <group ref={groupRef}>
      {/* Deep space star field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.positions.length / 3}
            array={starPositions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starPositions.colors.length / 3}
            array={starPositions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating luminous particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={floatingParticles.positions.length / 3}
            array={floatingParticles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#6fa8ff"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Main portal - outer ring */}
      <mesh ref={portalRingRef} position={[0, 0, -5]}>
        <torusGeometry args={[6, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#4f8fff"
          emissive="#2060cc"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner portal ring */}
      <mesh ref={portalRef} position={[0, 0, -5]}>
        <torusGeometry args={[4.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#80b0ff"
          emissive="#4080ff"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* User Photo Avatar in Center of Portal Circle */}
      <PortalAvatar />

      {/* Portal center glow behind photo */}
      <mesh ref={glowRef} position={[0, 0, -5.1]}>
        <circleGeometry args={[4.3, 64]} />
        <meshBasicMaterial
          color="#1a3a6a"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Energy arcs around portal */}
      {[0, 1, 2, 3].map((i) => (
        <Float key={i} speed={2 + i} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh
            position={[
              Math.cos((i * Math.PI) / 2) * 7,
              Math.sin((i * Math.PI) / 2) * 7,
              -4 + i * 0.5,
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial
              color="#80b0ff"
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Portal light source */}
      <pointLight position={[0, 0, -3]} intensity={2} color="#4f8fff" distance={20} />
      <pointLight position={[0, 0, -7]} intensity={1} color="#2040aa" distance={15} />

      {/* Enter prompt */}
      {active && (
        <Html center position={[0, -6.5, 0]} distanceFactor={6.5}>
          <div
            onClick={handleEnter}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '12px',
              textShadow: '0 0 20px rgba(79, 143, 255, 0.8)',
            }}>
              Enter the Multiverse
            </div>
            <div style={{
              width: '44px',
              height: '44px',
              margin: '0 auto',
              border: '2px solid rgba(79, 143, 255, 0.8)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s ease-in-out infinite',
              background: 'rgba(5, 10, 25, 0.6)',
              backdropFilter: 'blur(8px)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#80b0ff" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
