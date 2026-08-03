import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * CameraController - GSAP-driven adaptive camera rig
 * Dynamic aspect-ratio FOV scaling for ultra-responsive presentation across mobile, tablet, & 4K displays.
 * Exponential dampening lerps for buttery-smooth up-close viewing.
 */

const WORLD_SPACING = 50;

// Local camera offsets relative to each world center [x, y, z_offset]
const LOCAL_CAMERAS = [
  { pos: [0, 0, 16], look: [0, 0, 0], fov: 55 },        // World 0: Gateway
  { pos: [0, 0.5, 11], look: [0, 0.2, 0], fov: 55 },    // World 1: Hero
  { pos: [0, 0, 8], look: [0, 0, 0], fov: 50 },         // World 2: About
  { pos: [0, 1.5, 14], look: [0, 0, 0], fov: 55 },      // World 3: Skills
  { pos: [0, 0.5, 10], look: [0, 0, 0], fov: 52 },      // World 4: Portfolio
  { pos: [0, 0.5, 10], look: [0, 0, 0], fov: 50 },      // World 5: Blog
  { pos: [0, 0, 10], look: [0, 0, 0], fov: 52 },        // World 6: Contact
];

export default function CameraController({ 
  currentWorld = 0, 
  mousePosition = { x: 0, y: 0 },
  scrollProgress = 0 
}) {
  const { camera, size } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const mouseInfluence = useRef(new THREE.Vector2());
  const isTransitioning = useRef(false);

  // Responsive FOV adjustment based on screen aspect ratio
  const aspect = size.width / size.height;
  const config = LOCAL_CAMERAS[currentWorld] || LOCAL_CAMERAS[0];
  const targetFov = aspect < 0.8 
    ? config.fov * 1.35  // Mobile portrait (expand view to fit cards)
    : aspect < 1.2 
    ? config.fov * 1.15  // Tablet / iPad
    : config.fov;         // Desktop / 16:9 / 21:9

  // Animate camera to new world position with ultra-smooth GSAP power3.out easing
  useEffect(() => {
    const worldZ = -currentWorld * WORLD_SPACING;

    const absTargetPos = {
      x: config.pos[0],
      y: config.pos[1],
      z: worldZ + config.pos[2],
    };

    const absTargetLook = {
      x: config.look[0],
      y: config.look[1],
      z: worldZ + config.look[2],
    };

    isTransitioning.current = true;

    // Camera Position Tween
    gsap.to(targetPos.current, {
      x: absTargetPos.x,
      y: absTargetPos.y,
      z: absTargetPos.z,
      duration: 1.4,
      ease: 'power3.out',
      onComplete: () => { isTransitioning.current = false; }
    });

    // Camera LookAt Tween
    gsap.to(targetLook.current, {
      x: absTargetLook.x,
      y: absTargetLook.y,
      z: absTargetLook.z,
      duration: 1.4,
      ease: 'power3.out',
    });
  }, [currentWorld, config]);

  // Smooth responsive FOV update
  useEffect(() => {
    gsap.to(camera, {
      fov: targetFov,
      duration: 1.0,
      ease: 'power2.out',
      onUpdate: () => camera.updateProjectionMatrix(),
    });
  }, [targetFov, camera]);

  useFrame((_, delta) => {
    // Parallax effect
    const parallaxStrength = isTransitioning.current ? 0.04 : 0.22;
    mouseInfluence.current.x = THREE.MathUtils.damp(
      mouseInfluence.current.x,
      mousePosition.x * parallaxStrength,
      6,
      delta
    );
    mouseInfluence.current.y = THREE.MathUtils.damp(
      mouseInfluence.current.y,
      mousePosition.y * parallaxStrength,
      6,
      delta
    );

    // Frame-rate independent exponential dampening for buttery-smooth close-ups
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPos.current.x + mouseInfluence.current.x,
      7,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPos.current.y + mouseInfluence.current.y,
      7,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPos.current.z,
      7,
      delta
    );

    // Dynamic LookAt with smooth dampening
    const lookTarget = new THREE.Vector3(
      targetLook.current.x + mouseInfluence.current.x * 0.35,
      targetLook.current.y + mouseInfluence.current.y * 0.35,
      targetLook.current.z
    );
    camera.lookAt(lookTarget);
  });

  return null;
}

export { LOCAL_CAMERAS, WORLD_SPACING };
