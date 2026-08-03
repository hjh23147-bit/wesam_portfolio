import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * World 3: About — The Core
 * Glass chamber with holographic displays and centered Arabic & English text overlay.
 */
export default function World3About({ active, lang, isRtl }) {
  const glassRoomRef = useRef();

  const aboutData = {
    name: isRtl ? 'وسام وليد النظاري' : 'Wesam Waleed Al-Nathari',
    title: isRtl ? 'مهندس أنظمة ومطور حلول متقدمة' : 'Systems Architect & Advanced Solutions Engineer',
    bio: isRtl
      ? 'متخصص في بناء منصات الويب الحديثة عالية الأداء، تصميم معمارية الأنظمة الموزعة، دمج حلول الذكاء الاصطناعي، وتأمين البنى التحتية البرمجية.'
      : 'Specialized in building high-performance modern web platforms, designing resilient distributed architectures, integrating AI solutions, and hardening enterprise applications.',
    highlights: isRtl
      ? ['تصميم مخططات DFD & ERD', 'واجهات متجاوبة ثنائية اللغة', 'حماية OWASP كاملة', 'حلول ذكاء اصطناعي']
      : ['DFD & ERD System Diagrams', 'Bilingual Responsive UIs', 'Full OWASP Compliance', 'AI-Powered Solutions'],
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (glassRoomRef.current) {
      glassRoomRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group>
      {/* Glass room structure */}
      <group ref={glassRoomRef} position={[0, 0, -2]}>
        <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial
            color="#050a15"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>

        {[
          { pos: [0, 0, -6], rot: [0, 0, 0] },
          { pos: [-6, 0, 0], rot: [0, Math.PI / 2, 0] },
          { pos: [6, 0, 0], rot: [0, -Math.PI / 2, 0] },
        ].map((wall, i) => (
          <mesh key={i} position={wall.pos} rotation={wall.rot}>
            <planeGeometry args={[12, 6]} />
            <meshPhysicalMaterial
              color="#0a1628"
              metalness={0.1}
              roughness={0.05}
              transmission={0.9}
              thickness={0.5}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {[
          { pos: [-6, 0, -6] },
          { pos: [6, 0, -6] },
        ].map((edge, i) => (
          <mesh key={`edge-${i}`} position={edge.pos}>
            <boxGeometry args={[0.05, 6, 0.05]} />
            <meshBasicMaterial
              color="#4f8fff"
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {[
        { pos: [-3.5, 0.5, -2], rot: [0, 0.2, 0] },
        { pos: [3.5, 0.5, -2], rot: [0, -0.2, 0] },
      ].map((panel, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <mesh position={panel.pos} rotation={panel.rot}>
            <planeGeometry args={[3, 2.2]} />
            <meshBasicMaterial color="#0d2040" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={panel.pos} rotation={panel.rot}>
            <edgesGeometry args={[new THREE.PlaneGeometry(3, 2.2)]} />
            <lineBasicMaterial color="#4f8fff" transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}

      <pointLight position={[0, 3, 0]} intensity={1.5} color="#4f8fff" distance={15} />

      {active && (
        <Html center position={[0, 0, 1.5]} distanceFactor={5.5}>
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
              marginBottom: '10px',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(79, 143, 255, 0.5)',
            }}>
              {isRtl ? 'حول المهندس' : 'About the Engineer'}
            </div>

            <h2 style={{
              fontSize: isRtl ? '34px' : '38px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 auto 8px',
              lineHeight: 1.25,
              textAlign: 'center',
            }}>
              {aboutData.name}
            </h2>

            <p style={{
              fontSize: isRtl ? '17px' : '18px',
              fontWeight: 700,
              color: '#4f8fff',
              margin: '0 auto 16px',
              textAlign: 'center',
            }}>
              {aboutData.title}
            </p>

            <p style={{
              fontSize: '14px',
              color: 'rgba(210, 230, 255, 0.88)',
              lineHeight: 1.7,
              margin: '0 auto 20px',
              maxWidth: '500px',
              textAlign: 'center',
              fontWeight: 500,
            }}>
              {aboutData.bio}
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              margin: '0 auto',
            }}>
              {aboutData.highlights.map((h, i) => (
                <span key={i} style={{
                  padding: '8px 18px',
                  background: 'rgba(15, 30, 60, 0.85)',
                  border: '1px solid rgba(79, 143, 255, 0.35)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#a0d0ff',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 15px rgba(79, 143, 255, 0.15)',
                }}>
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
