import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * World 4: Skills — Tech Galaxy
 * Central core with tech planets orbiting with stable centered Arabic & English text overlay.
 */

const TECH_PLANETS = [
  { name: 'Laravel', color: '#FF2D20', orbitRadius: 4.5, size: 0.45, speed: 0.2, y: 0, desc: 'PHP Framework', proficiency: 95 },
  { name: 'PHP', color: '#777BB4', orbitRadius: 5.5, size: 0.4, speed: 0.16, y: 0.8, desc: 'Server Language', proficiency: 92 },
  { name: 'MySQL', color: '#4479A1', orbitRadius: 6.5, size: 0.42, speed: 0.14, y: -0.5, desc: 'Database Engine', proficiency: 93 },
  { name: 'Python', color: '#3776AB', orbitRadius: 7.2, size: 0.42, speed: 0.12, y: 0.5, desc: 'AI & Scripting', proficiency: 88 },
  { name: 'React', color: '#61DAFB', orbitRadius: 4.0, size: 0.42, speed: 0.24, y: -0.8, desc: 'Frontend Library', proficiency: 95 },
  { name: 'Docker', color: '#2496ED', orbitRadius: 8.0, size: 0.38, speed: 0.1, y: 1.0, desc: 'Containerization', proficiency: 85 },
  { name: 'Linux', color: '#FCC624', orbitRadius: 8.8, size: 0.4, speed: 0.08, y: -1.0, desc: 'Operating System', proficiency: 89 },
  { name: 'AI/ML', color: '#FF6F00', orbitRadius: 3.5, size: 0.45, speed: 0.28, y: 0.6, desc: 'Machine Learning', proficiency: 88 },
];

export default function World4Skills({ active, lang, isRtl }) {
  const coreRef = useRef();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.1;
      coreRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <group>
      <StarField count={600} />

      {/* Central gravity core */}
      <group ref={coreRef} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#1a3a6a"
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.9, 16, 16]} />
          <meshBasicMaterial
            color="#4f8fff"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={3} color="#4f8fff" distance={15} />
      </group>

      {TECH_PLANETS.map((planet, i) => (
        <TechPlanet
          key={planet.name}
          planet={planet}
          index={i}
          selected={selectedPlanet === i}
          onSelect={() => setSelectedPlanet(selectedPlanet === i ? null : i)}
          isRtl={isRtl}
        />
      ))}

      {TECH_PLANETS.map((planet, i) => (
        <mesh key={`orbit-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[planet.orbitRadius, 0.01, 4, 128]} />
          <meshBasicMaterial
            color="#4f8fff"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {active && (
        <Html center position={[0, 4.5, 2]} distanceFactor={6.5}>
          <div className="r3f-html-overlay" style={{
            width: '580px',
            maxWidth: '90vw',
            margin: '0 auto',
            textAlign: 'center',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            direction: isRtl ? 'rtl' : 'ltr',
            userSelect: 'none',
          }}>
            <div style={{
              fontSize: '13px',
              color: '#6fa8ff',
              letterSpacing: isRtl ? '1px' : '5px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(79, 143, 255, 0.5)',
            }}>
              {isRtl ? 'المجرة التقنية' : 'Tech Galaxy'}
            </div>
            <h2 style={{
              fontSize: isRtl ? '32px' : '34px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 auto',
              textAlign: 'center',
            }}>
              {isRtl ? 'المهارات والخبرات الهندسية' : 'Engineering Skills & Expertise'}
            </h2>
          </div>
        </Html>
      )}
    </group>
  );
}

function TechPlanet({ planet, index, selected, onSelect, isRtl }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const initialAngle = (index / TECH_PLANETS.length) * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = initialAngle + t * planet.speed;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * planet.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * planet.orbitRadius;
      groupRef.current.position.y = planet.y + Math.sin(t + index) * 0.25;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
    }

    if (glowRef.current) {
      const targetScale = hovered || selected ? 2.0 : 1.3;
      glowRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      glowRef.current.material.opacity = hovered || selected ? 0.3 : 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={onSelect}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[planet.size, 16, 16]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={hovered || selected ? 2.5 : 1.0}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[planet.size * 1.3, 16, 16]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight
        intensity={hovered || selected ? 1.5 : 0.4}
        color={planet.color}
        distance={5}
      />

      <Html center position={[0, planet.size + 0.5, 0]} distanceFactor={6}>
        <div
          onClick={onSelect}
          style={{
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            fontSize: '12px',
            color: hovered || selected ? '#ffffff' : 'rgba(220, 235, 255, 0.85)',
            fontWeight: 700,
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            textShadow: `0 0 10px ${planet.color}`,
            transition: 'all 0.3s',
            userSelect: 'none',
            textAlign: 'center',
          }}
        >
          {planet.name}
        </div>
      </Html>

      {selected && (
        <Html center position={[0, -planet.size - 1.2, 0]} distanceFactor={5.5}>
          <div className="r3f-html-overlay" style={{
            padding: '14px 20px',
            background: 'rgba(5, 10, 25, 0.9)',
            border: `1px solid ${planet.color}50`,
            borderRadius: '12px',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            minWidth: '180px',
            textAlign: 'center',
            backdropFilter: 'blur(15px)',
            boxShadow: `0 0 25px ${planet.color}30`,
            userSelect: 'none',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: planet.color, marginBottom: '4px' }}>
              {planet.name}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(200, 225, 255, 0.7)', marginBottom: '8px' }}>
              {planet.desc}
            </div>
            <div style={{
              height: '5px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${planet.proficiency}%`,
                background: `linear-gradient(90deg, ${planet.color}, #ffffff)`,
                borderRadius: '3px',
              }} />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
              {planet.proficiency}% {isRtl ? 'إتقان' : 'Proficiency'}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function StarField({ count = 600 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8ab4ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
