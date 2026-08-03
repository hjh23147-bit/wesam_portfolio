import React, { useMemo } from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * PostProcessingRig - Configurable post-processing pipeline
 * Each world can customize its effect intensities.
 */
const WORLD_PRESETS = {
  gateway: {
    bloomIntensity: 1.5,
    bloomThreshold: 0.6,
    bloomRadius: 0.8,
    chromaticAberration: 0.0005,
    vignetteIntensity: 0.4,
    dofEnabled: false,
  },
  hero: {
    bloomIntensity: 1.2,
    bloomThreshold: 0.5,
    bloomRadius: 0.6,
    chromaticAberration: 0.0003,
    vignetteIntensity: 0.3,
    dofEnabled: false,
  },
  about: {
    bloomIntensity: 0.8,
    bloomThreshold: 0.7,
    bloomRadius: 0.5,
    chromaticAberration: 0.001,
    vignetteIntensity: 0.35,
    dofEnabled: false,
  },
  skills: {
    bloomIntensity: 1.4,
    bloomThreshold: 0.5,
    bloomRadius: 0.7,
    chromaticAberration: 0.0004,
    vignetteIntensity: 0.3,
    dofEnabled: false,
  },
  portfolio: {
    bloomIntensity: 1.0,
    bloomThreshold: 0.6,
    bloomRadius: 0.5,
    chromaticAberration: 0.0003,
    vignetteIntensity: 0.4,
    dofEnabled: false,
  },
  blog: {
    bloomIntensity: 0.6,
    bloomThreshold: 0.8,
    bloomRadius: 0.4,
    chromaticAberration: 0.0002,
    vignetteIntensity: 0.5,
    dofEnabled: false,
  },
  contact: {
    bloomIntensity: 1.3,
    bloomThreshold: 0.5,
    bloomRadius: 0.7,
    chromaticAberration: 0.0006,
    vignetteIntensity: 0.35,
    dofEnabled: false,
  },
};

export default function PostProcessingRig({ worldKey = 'gateway', quality = 1.0 }) {
  const preset = WORLD_PRESETS[worldKey] || WORLD_PRESETS.gateway;

  // Scale effects based on performance quality
  const scaledBloom = preset.bloomIntensity * quality;

  const offset = useMemo(() => {
    const val = preset.chromaticAberration * quality;
    // ChromaticAberration expects a Vector2-like offset
    return [val, val];
  }, [preset.chromaticAberration, quality]);

  return (
    <EffectComposer multisampling={quality > 0.7 ? 4 : 0}>
      <Bloom
        intensity={scaledBloom}
        luminanceThreshold={preset.bloomThreshold}
        luminanceSmoothing={preset.bloomRadius}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        offset={0.3}
        darkness={preset.vignetteIntensity}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
