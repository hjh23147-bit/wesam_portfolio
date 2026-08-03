// Portal transition fragment shader
uniform float uTime;
uniform float uProgress;
uniform vec3 uColor;
uniform float uRadius;

varying vec2 vUv;
varying vec3 vPosition;

#define PI 3.14159265359

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 center = vec2(0.5);
    vec2 uv = vUv - center;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Portal ring
    float ring = smoothstep(uRadius - 0.05, uRadius, dist) *
                 smoothstep(uRadius + 0.05, uRadius, dist);
    
    // Swirl effect
    float swirl = sin(angle * 8.0 + uTime * 3.0 + dist * 20.0) * 0.5 + 0.5;
    
    // Energy rings
    float energy = sin(dist * 40.0 - uTime * 5.0) * 0.5 + 0.5;
    energy *= smoothstep(uRadius + 0.1, uRadius - 0.1, dist);
    
    // Portal opening based on progress
    float portalMask = smoothstep(uRadius * uProgress, uRadius * uProgress - 0.02, dist);
    
    // Inner vortex
    float vortex = sin(angle * 3.0 - uTime * 4.0 + dist * 10.0) * 0.5 + 0.5;
    vortex *= portalMask;
    
    // Color
    vec3 color = uColor * ring * 2.0;
    color += uColor * 0.5 * swirl * ring;
    color += uColor * 0.3 * energy;
    color += vec3(0.5, 0.7, 1.0) * vortex * 0.3;
    
    // Glow
    float glow = exp(-dist * 3.0) * uProgress;
    color += uColor * glow * 0.5;
    
    float alpha = ring + energy * 0.5 + vortex * 0.3 + glow * 0.3;
    alpha = clamp(alpha, 0.0, 1.0);
    
    gl_FragColor = vec4(color, alpha);
}
