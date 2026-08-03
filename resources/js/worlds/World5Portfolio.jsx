import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getProjects, fallbackProjects } from '../services/api';

/**
 * World 5: Portfolio — Research Labs
 * Floating laboratory modules positioned close to camera view with centered Arabic & English text overlay.
 */
export default function World5Portfolio({ active, lang, isRtl }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getProjects().then(res => {
      const list = Array.isArray(res) ? res : fallbackProjects;
      setProjects(list.slice(0, 6));
    }).catch(() => setProjects(fallbackProjects.slice(0, 6)));
  }, []);

  const projectPositions = useMemo(() => {
    const positions = [];
    const cols = 3;
    const spacingX = 5.5;
    const spacingY = 4.2;
    projects.forEach((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      positions.push({
        x: (col - (cols - 1) / 2) * spacingX,
        y: -row * spacingY + 1,
        z: 0,
      });
    });
    return positions;
  }, [projects]);

  return (
    <group>
      <MatrixParticles />

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
              color: '#4fff8f',
              letterSpacing: isRtl ? '1px' : '5px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(79, 255, 143, 0.5)',
            }}>
              {isRtl ? 'مركز الأبحاث' : 'Research Labs'}
            </div>
            <h2 style={{
              fontSize: isRtl ? '32px' : '34px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 auto',
              textAlign: 'center',
            }}>
              {isRtl ? 'معرض الأعمال والمشاريع' : 'Portfolio & Featured Works'}
            </h2>
          </div>
        </Html>
      )}

      {projects.map((project, i) => {
        const pos = projectPositions[i];
        if (!pos) return null;
        return (
          <LabModule
            key={project.id}
            project={project}
            position={[pos.x, pos.y, pos.z]}
            index={i}
            selected={selectedProject === i}
            onSelect={() => setSelectedProject(selectedProject === i ? null : i)}
            isRtl={isRtl}
          />
        );
      })}

      <pointLight position={[0, 5, 5]} intensity={1.2} color="#4fff8f" distance={20} />
      <ambientLight intensity={0.15} />
    </group>
  );
}

function LabModule({ project, position, index, selected, onSelect, isRtl }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const title = isRtl ? project.title_ar : project.title_en;
  const summary = isRtl ? project.summary_ar : project.summary_en;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.2;

      const targetScale = hovered || selected ? 1.08 : 1.0;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const techStack = project.tech_stack || [];

  return (
    <group ref={meshRef} position={position}>
      <mesh
        onClick={onSelect}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[4.8, 3.2, 0.25]} />
        <meshStandardMaterial
          color={hovered || selected ? '#0a2520' : '#051218'}
          emissive={hovered || selected ? '#1a5a40' : '#0a2520'}
          emissiveIntensity={hovered || selected ? 1.8 : 0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.8, 3.2, 0.25)]} />
        <lineBasicMaterial
          color={hovered || selected ? '#4fff8f' : '#2a7a5a'}
          transparent
          opacity={hovered || selected ? 0.9 : 0.4}
        />
      </lineSegments>

      <pointLight
        position={[0, 0, 1]}
        intensity={hovered || selected ? 1.2 : 0.3}
        color="#4fff8f"
        distance={5}
      />

      <Html center position={[0, 0, 0.2]} distanceFactor={5.5}>
        <div
          onClick={onSelect}
          style={{
            width: '240px',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            textAlign: 'center',
            direction: isRtl ? 'rtl' : 'ltr',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '12px',
          }}
        >
          <div style={{
            fontSize: '9px',
            color: '#4fff8f',
            letterSpacing: isRtl ? '1px' : '2px',
            textTransform: 'uppercase',
            marginBottom: '4px',
            fontWeight: 700,
          }}>
            {project.category || 'PROJECT'}
          </div>
          <div style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(180, 255, 210, 0.8)',
            lineHeight: 1.5,
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {summary}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
            {techStack.slice(0, 4).map((tech, i) => (
              <span key={i} style={{
                padding: '3px 8px',
                background: 'rgba(79, 255, 143, 0.12)',
                border: '1px solid rgba(79, 255, 143, 0.3)',
                borderRadius: '4px',
                fontSize: '9px',
                fontWeight: 700,
                color: '#4fff8f',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {selected && (
            <div style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(79, 255, 143, 0.25)',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
            }}>
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{
                  padding: '6px 14px',
                  background: 'rgba(79, 255, 143, 0.2)',
                  border: '1px solid #4fff8f',
                  borderRadius: '6px',
                  color: '#4fff8f',
                  fontSize: '10px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  {isRtl ? 'معاينة حية' : 'Live Demo'}
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{
                  padding: '6px 14px',
                  background: 'rgba(79, 143, 255, 0.2)',
                  border: '1px solid #4f8fff',
                  borderRadius: '6px',
                  color: '#4f8fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  {isRtl ? 'المستودع' : 'Source Code'}
                </a>
              )}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function MatrixParticles() {
  const ref = useRef();
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= 0.02;
      if (positions[i * 3 + 1] < -15) {
        positions[i * 3 + 1] = 15;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.06}
        color="#4fff8f"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
