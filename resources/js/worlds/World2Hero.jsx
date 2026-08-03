import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * World 2: Hero Universe
 * Responsive fluid layout scaled perfectly for mobile, tablet, desktop, & 4K monitors.
 */
export default function World2Hero({ active, mousePosition = { x: 0, y: 0 }, lang, isRtl }) {
  const cityRef = useRef();
  const ringsRef = useRef();
  const nodesRef = useRef();

  const buildings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 11;
      const z = (Math.random() - 0.5) * 9 - 1;
      const height = Math.random() * 2.8 + 0.6;
      const width = Math.random() * 0.5 + 0.25;
      const emissiveColor = i % 4 === 0 ? '#4f8fff' : i % 4 === 1 ? '#80b0ff' : i % 4 === 2 ? '#3060cc' : '#4fff8f';
      arr.push({ x, z, height, width, y: height / 2 - 1, color: emissiveColor });
    }
    return arr;
  }, []);

  const dataNodes = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      radius: Math.random() * 4 + 5.5,
      y: (Math.random() - 0.5) * 3.5,
      speed: Math.random() * 0.2 + 0.1,
      size: Math.random() * 0.12 + 0.06,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (cityRef.current) {
      cityRef.current.rotation.y = t * 0.04 + mousePosition.x * 0.12;
      cityRef.current.position.y = Math.sin(t * 0.3) * 0.2 - 0.5;
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (0.08 + i * 0.04);
        ring.rotation.x = Math.sin(t * 0.2 + i) * 0.08;
      });
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const data = dataNodes[i];
        if (!data) return;
        const angle = data.angle + t * data.speed;
        node.position.x = Math.cos(angle) * data.radius;
        node.position.z = Math.sin(angle) * data.radius;
        node.position.y = data.y + Math.sin(t + i) * 0.4;
      });
    }
  });

  return (
    <group>
      <AuroraParticles />

      {/* Floating digital city */}
      <group ref={cityRef} position={[0, -0.5, -2]}>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[6.5, 7.5, 0.25, 32]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#0d2040"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        <mesh position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[6.6, 0.04, 16, 100]} />
          <meshStandardMaterial color="#4f8fff" emissive="#4f8fff" emissiveIntensity={3} />
        </mesh>

        {buildings.map((b, i) => (
          <group key={i} position={[b.x, b.y, b.z]}>
            <mesh>
              <boxGeometry args={[b.width, b.height, b.width]} />
              <meshStandardMaterial
                color="#0d1a2d"
                emissive={b.color}
                emissiveIntensity={Math.random() * 1.5 + 0.6}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.92}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(b.width, b.height, b.width)]} />
              <lineBasicMaterial color={b.color} transparent opacity={0.4} />
            </lineSegments>
          </group>
        ))}

        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.75, 4.2, 0.75]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#4080ff"
            emissiveIntensity={3}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        <pointLight position={[0, 3.6, 0]} intensity={3.5} color="#4f8fff" distance={16} />

        {buildings.filter((_, i) => i % 3 === 0).map((b, i) => (
          <pointLight
            key={i}
            position={[b.x, b.height + 0.3, b.z]}
            intensity={0.4}
            color={b.color}
            distance={4}
          />
        ))}
      </group>

      <group ref={ringsRef} position={[0, 0, -2]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
            <torusGeometry args={[7 + i * 1.8, 0.02, 8, 128]} />
            <meshBasicMaterial
              color={['#4f8fff', '#6fa8ff', '#3060cc'][i]}
              transparent
              opacity={0.4 - i * 0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      <group ref={nodesRef} position={[0, 0, -2]}>
        {dataNodes.map((node, i) => (
          <Float key={i} speed={1.5} floatIntensity={0.2}>
            <mesh>
              <icosahedronGeometry args={[node.size, 0]} />
              <meshBasicMaterial color="#6fa8ff" transparent opacity={0.85} />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Hero text overlay — Responsive Clamps */}
      {active && (
        <Html center position={[0, 0.5, 3]} distanceFactor={7}>
          <div style={{
            width: 'min(90vw, 650px)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            userSelect: 'none',
            boxSizing: 'border-box',
            direction: 'ltr',
          }}>
            <div dir={isRtl ? 'rtl' : 'ltr'} style={{
              fontSize: 'clamp(11px, 1.8vw, 14px)',
              color: '#6fa8ff',
              letterSpacing: isRtl ? '1px' : '4px',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(79, 143, 255, 0.6)',
              textAlign: 'center',
              width: '100%',
            }}>
              {isRtl ? 'مرحباً بك، أنا' : "Hello, I'm"}
            </div>

            <h1 dir={isRtl ? 'rtl' : 'ltr'} style={{
              fontSize: 'clamp(32px, 5.5vw, 50px)',
              fontWeight: 900,
              margin: '0 auto 10px',
              background: 'linear-gradient(135deg, #ffffff 0%, #a0d0ff 50%, #4f8fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
              textAlign: 'center',
              width: '100%',
            }}>
              {isRtl ? 'وسام وليد النظاري' : 'Wesam Al-Nathari'}
            </h1>

            <p dir={isRtl ? 'rtl' : 'ltr'} style={{
              fontSize: 'clamp(14px, 2.8vw, 20px)',
              fontWeight: 700,
              color: '#4f8fff',
              margin: '0 auto 14px',
              lineHeight: 1.4,
              textAlign: 'center',
              textShadow: '0 0 15px rgba(79, 143, 255, 0.35)',
              width: '100%',
            }}>
              {isRtl
                ? 'مهندس أنظمة · مطور واجهات · مطوّر حلول ذكية'
                : 'Systems Architect · Frontend Developer · AI Solutions Engineer'}
            </p>

            <p dir={isRtl ? 'rtl' : 'ltr'} style={{
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              color: 'rgba(210, 230, 255, 0.9)',
              margin: '0 auto 22px',
              maxWidth: '540px',
              lineHeight: 1.7,
              textAlign: 'center',
              fontWeight: 500,
              width: '100%',
            }}>
              {isRtl
                ? 'متخصص في بناء منصات الويب الحديثة، تصميم معمارية الأنظمة الموزعة، ودمج حلول الذكاء الاصطناعي.'
                : 'Specialized in building high-performance web platforms, designing resilient distributed architectures, and integrating AI solutions.'}
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 auto 24px',
            }}>
              <a
                href="/CV_Wesam_Alnathari.pdf"
                download
                style={{
                  padding: '12px clamp(20px, 4vw, 32px)',
                  background: 'linear-gradient(135deg, #2060cc, #4080ff)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: 'clamp(12px, 1.8vw, 14px)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(79, 143, 255, 0.4)',
                  boxShadow: '0 0 25px rgba(79, 143, 255, 0.35)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'inline-block',
                }}
              >
                {isRtl ? 'تحميل السيرة الذاتية' : 'Download CV'}
              </a>
            </div>

            {/* Stats badges */}
            <div style={{
              display: 'flex',
              gap: 'clamp(8px, 2vw, 16px)',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 auto',
              flexWrap: 'wrap',
            }}>
              {[
                { value: '99.9%', label: isRtl ? 'استقرار المعمارية' : 'Architecture Uptime' },
                { value: '10+', label: isRtl ? 'حلول ومعماريات' : 'Enterprise Solutions' },
                { value: '100%', label: isRtl ? 'التزام بالأمان' : 'OWASP Compliant' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  background: 'rgba(10, 20, 45, 0.85)',
                  borderRadius: '12px',
                  border: '1px solid rgba(79, 143, 255, 0.3)',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  minWidth: '95px',
                  flex: '1 1 95px',
                  maxWidth: '160px',
                }}>
                  <div style={{
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    fontWeight: 800,
                    color: '#4f8fff',
                    lineHeight: 1.2,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 'clamp(10px, 1.4vw, 11px)',
                    color: 'rgba(180, 210, 255, 0.8)',
                    marginTop: '2px',
                    fontWeight: 600,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function AuroraParticles() {
  const ref = useRef();
  const count = 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#4080ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
