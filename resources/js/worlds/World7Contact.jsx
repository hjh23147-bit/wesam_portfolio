import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { sendContactMessage } from '../services/api';

/**
 * World 7: Contact — Space Station
 * Viewport & contact form with stable centered Arabic & English typography.
 */
export default function World7Contact({ active, lang, isRtl }) {
  const earthRef = useRef();
  const stationRef = useRef();
  const [laserActive, setLaserActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.02;
    }
    if (stationRef.current) {
      stationRef.current.position.y = Math.sin(t * 0.2) * 0.2;
    }
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await sendContactMessage(formData);
      if (res.status === 'success') {
        setStatus({ type: 'success', msg: isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLaserActive(true);
        setFormSubmitted(true);
        setTimeout(() => { setLaserActive(false); setFormSubmitted(false); }, 4000);
      } else {
        setStatus({ type: 'error', msg: res.message || (isRtl ? 'حدث خطأ' : 'Failed to send') });
      }
    } catch {
      setStatus({ type: 'error', msg: isRtl ? 'حدث خطأ أثناء الإرسال' : 'Failed to send message' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <group>
      <NebulaBackground />
      <SpaceStationStars />

      {/* Earth */}
      <group ref={earthRef} position={[10, -5, -12]}>
        <mesh>
          <sphereGeometry args={[8, 64, 64]} />
          <meshStandardMaterial
            color="#1a3a6a"
            emissive="#0a2040"
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[8.4, 64, 64]} />
          <meshBasicMaterial
            color="#4fa0ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
        <pointLight position={[0, 0, 10]} intensity={2} color="#4fa0ff" distance={20} />
      </group>

      {/* Viewport frame */}
      <group ref={stationRef} position={[0, 0, 1]}>
        {[
          { pos: [0, 3.5, 0], size: [10, 0.12, 0.2] },
          { pos: [0, -3.5, 0], size: [10, 0.12, 0.2] },
          { pos: [-5, 0, 0], size: [0.12, 7, 0.2] },
          { pos: [5, 0, 0], size: [0.12, 7, 0.2] },
        ].map((frame, i) => (
          <mesh key={i} position={frame.pos}>
            <boxGeometry args={frame.size} />
            <meshStandardMaterial
              color="#0a1628"
              emissive="#1a2a40"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        <pointLight position={[0, 2, 2]} intensity={0.4} color="#4f8fff" distance={8} />
      </group>

      {laserActive && <LaserBeam />}
      {formSubmitted && <ParticleBurst />}

      {active && (
        <Html center position={[0, 0, 2]} distanceFactor={5.5}>
          <div className="r3f-html-overlay" style={{
            width: '450px',
            maxWidth: '90vw',
            margin: '0 auto',
            fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
            direction: isRtl ? 'rtl' : 'ltr',
            userSelect: 'none',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                fontSize: '11px',
                color: '#6fa8ff',
                letterSpacing: isRtl ? '1px' : '4px',
                textTransform: 'uppercase',
                marginBottom: '6px',
                fontWeight: 700,
              }}>
                {isRtl ? 'محطة التواصل الفضائية' : 'Space Communication Station'}
              </div>
              <h2 style={{
                fontSize: isRtl ? '30px' : '32px',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                textAlign: 'center',
              }}>
                {isRtl ? 'تواصل معي' : 'Get In Touch'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              {status.msg && (
                <div style={{
                  padding: '10px 14px',
                  background: status.type === 'success' ? 'rgba(79, 255, 143, 0.15)' : 'rgba(255, 79, 79, 0.15)',
                  border: `1px solid ${status.type === 'success' ? '#4fff8f' : '#ff4f4f'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: status.type === 'success' ? '#4fff8f' : '#ff4f4f',
                  textAlign: 'center',
                }}>
                  {status.msg}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text" name="name" required
                  value={formData.name} onChange={handleChange}
                  placeholder={isRtl ? 'الاسم الكامل' : 'Full Name'}
                  style={{ ...inputStyle, fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif" }}
                />
                <input
                  type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder={isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                  style={{ ...inputStyle, fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif" }}
                />
              </div>

              <input
                type="text" name="subject"
                value={formData.subject} onChange={handleChange}
                placeholder={isRtl ? 'الموضوع' : 'Subject'}
                style={{ ...inputStyle, fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif" }}
              />

              <textarea
                name="message" required rows={4}
                value={formData.message} onChange={handleChange}
                placeholder={isRtl ? 'اكتب رسالتك...' : 'Your message...'}
                style={{ ...inputStyle, resize: 'none', minHeight: '90px', fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif" }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #2060cc, #4080ff)',
                  color: '#fff',
                  border: '1px solid rgba(79, 143, 255, 0.4)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  fontFamily: isRtl ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
                  letterSpacing: '1px',
                  boxShadow: '0 0 25px rgba(79, 143, 255, 0.35)',
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: 'all 0.3s',
                }}
              >
                {isSubmitting
                  ? (isRtl ? 'جاري الإرسال...' : 'Transmitting...')
                  : (isRtl ? '🚀 إرسال الرسالة' : '🚀 Launch Message')}
              </button>
            </form>
          </div>
        </Html>
      )}

      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#4fa0ff" />
    </group>
  );
}

const inputStyle = {
  flex: 1,
  padding: '12px 16px',
  background: 'rgba(5, 10, 25, 0.85)',
  border: '1px solid rgba(79, 143, 255, 0.3)',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '600',
  outline: 'none',
  backdropFilter: 'blur(12px)',
  transition: 'border-color 0.3s',
};

function LaserBeam() {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      const t = (state.clock.elapsedTime % 4) / 4;
      beamRef.current.scale.z = 1 + t * 50;
      beamRef.current.material.opacity = 1 - t;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 0, -5]}>
      <cylinderGeometry args={[0.03, 0.015, 2, 8]} />
      <meshBasicMaterial color="#4fff8f" transparent opacity={1} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function ParticleBurst() {
  const ref = useRef();
  const count = 100;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = -5;
      velocities.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: -(Math.random() * 3 + 1),
      });
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i].x * 0.1;
      pos[i * 3 + 1] += velocities[i].y * 0.1;
      pos[i * 3 + 2] += velocities[i].z * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.opacity *= 0.98;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#4fff8f" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function SpaceStationStars() {
  const positions = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1000} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function NebulaBackground() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -40]}>
      <planeGeometry args={[150, 150]} />
      <meshBasicMaterial color="#0a0520" transparent opacity={0.5} />
    </mesh>
  );
}
