import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { getArticles, fallbackArticles } from '../services/api';

/**
 * World 6: Blog — Cosmic Library
 * Digital glowing books floating close to camera view with centered Arabic & English text overlay.
 */
export default function World6Blog({ active, lang, isRtl }) {
  const [articles, setArticles] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    getArticles().then(res => {
      const list = Array.isArray(res) ? res : [];
      setArticles(list.length > 0 ? list.slice(0, 8) : (fallbackArticles || []).slice(0, 8));
    }).catch(() => setArticles((fallbackArticles || []).slice(0, 8)));
  }, []);

  return (
    <group>
      <DustParticles />
      <LibraryStructure />

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
              color: '#ffb84f',
              letterSpacing: isRtl ? '1px' : '5px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(255, 184, 79, 0.5)',
            }}>
              {isRtl ? 'المكتبة الكونية' : 'Cosmic Library'}
            </div>
            <h2 style={{
              fontSize: isRtl ? '32px' : '34px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 auto',
              textAlign: 'center',
            }}>
              {isRtl ? 'المدونة التقنية' : 'Technical Blog'}
            </h2>
          </div>
        </Html>
      )}

      {articles.map((article, i) => (
        <FloatingBook
          key={article.id || i}
          article={article}
          index={i}
          total={articles.length}
          selected={selectedBook === i}
          onSelect={() => setSelectedBook(selectedBook === i ? null : i)}
          isRtl={isRtl}
        />
      ))}

      <pointLight position={[0, 5, 5]} intensity={1.5} color="#ffb84f" distance={20} />
      <ambientLight intensity={0.15} />
    </group>
  );
}

function FloatingBook({ article, index, total, selected, onSelect, isRtl }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const title = isRtl ? (article.title_ar || article.title_en) : (article.title_en || article.title_ar);
  const summary = isRtl ? (article.excerpt_ar || article.excerpt_en || '') : (article.excerpt_en || article.excerpt_ar || '');

  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const radius = 5.2;
  const basePos = [Math.cos(angle) * radius, Math.sin(angle) * 1.5, Math.sin(angle) * radius - 1];

  const bookColors = ['#ff6b35', '#ffa040', '#ffcc70', '#4f8fff', '#6fa8ff', '#80b0ff', '#ff4060', '#ffb84f'];
  const bookColor = bookColors[index % bookColors.length];

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = basePos[1] + Math.sin(t * 0.3 + index * 1.5) * 0.3;
      groupRef.current.rotation.y = Math.sin(t * 0.1 + index) * 0.1 + angle;
    }
  });

  return (
    <group ref={groupRef} position={basePos}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <mesh
          onClick={onSelect}
          onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
          <boxGeometry args={[1.2, 1.8, 0.2]} />
          <meshStandardMaterial
            color={hovered || selected ? bookColor : '#1a1008'}
            emissive={bookColor}
            emissiveIntensity={hovered || selected ? 2.0 : 0.5}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        <mesh position={[-0.62, 0, 0]}>
          <boxGeometry args={[0.04, 1.8, 0.2]} />
          <meshBasicMaterial color={bookColor} transparent opacity={hovered || selected ? 0.9 : 0.4} />
        </mesh>

        <pointLight intensity={hovered || selected ? 1.0 : 0.2} color={bookColor} distance={4} />

        <Html center position={[0, 0, 0.15]} distanceFactor={4.5}>
          <div
            onClick={onSelect}
            style={{
              width: '120px',
              fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
              textAlign: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            <div style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.3,
              textShadow: `0 0 8px ${bookColor}`,
            }}>
              {title?.substring(0, 35)}
              {title?.length > 35 ? '...' : ''}
            </div>
            {article.category && (
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                color: bookColor,
                marginTop: '4px',
              }}>
                {article.category}
              </div>
            )}
          </div>
        </Html>
      </Float>

      {selected && (
        <Html center position={[2.0, 0, 0]} distanceFactor={4.5}>
          <div className="r3f-html-overlay" style={{
            width: '260px',
            padding: '18px',
            background: 'rgba(20, 12, 5, 0.92)',
            border: `1px solid ${bookColor}60`,
            borderRadius: '12px',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            backdropFilter: 'blur(15px)',
            boxShadow: `0 0 25px ${bookColor}25`,
            direction: isRtl ? 'rtl' : 'ltr',
            userSelect: 'none',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}>
              {title}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(255, 240, 210, 0.85)',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}>
              {summary?.substring(0, 150) || (isRtl ? 'مقال تقني متميز...' : 'An insightful technical article...')}
            </div>
            <a href={`/blog/${article.slug || ''}`} style={{
              padding: '8px 16px',
              background: `${bookColor}30`,
              border: `1px solid ${bookColor}`,
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              {isRtl ? 'اقرأ المقال' : 'Read Article'} →
            </a>
          </div>
        </Html>
      )}
    </group>
  );
}

function DustParticles() {
  const ref = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffcc70" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function LibraryStructure() {
  return (
    <group>
      {[0, 1].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5 + ring * 2.5, 0.015, 4, 128]} />
          <meshBasicMaterial color="#ffb84f" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}
