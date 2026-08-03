// Aurora borealis fragment shader
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;

#define PI 3.14159265359

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;
    
    // Mouse influence
    vec2 mouseInfluence = (uMouse - 0.5) * 0.3;
    
    // Aurora wave layers
    float wave1 = sin(uv.x * 4.0 + t + mouseInfluence.x * 2.0) * 0.5 + 0.5;
    float wave2 = sin(uv.x * 6.0 - t * 1.3 + mouseInfluence.y) * 0.5 + 0.5;
    float wave3 = sin(uv.x * 8.0 + t * 0.7) * 0.5 + 0.5;
    
    // Noise displacement
    float n = fbm(uv * 3.0 + vec2(t * 0.2, t * 0.1));
    
    // Aurora bands
    float band1 = smoothstep(0.3, 0.32, uv.y + wave1 * 0.15 + n * 0.1) *
                  smoothstep(0.7, 0.68, uv.y + wave1 * 0.15 + n * 0.1);
    float band2 = smoothstep(0.4, 0.42, uv.y + wave2 * 0.12 + n * 0.08) *
                  smoothstep(0.8, 0.78, uv.y + wave2 * 0.12 + n * 0.08);
    float band3 = smoothstep(0.2, 0.22, uv.y + wave3 * 0.1 + n * 0.12) *
                  smoothstep(0.6, 0.58, uv.y + wave3 * 0.1 + n * 0.12);
    
    // Color mixing
    vec3 color = vec3(0.0);
    color += uColor1 * band1 * 0.8;
    color += uColor2 * band2 * 0.6;
    color += uColor3 * band3 * 0.4;
    
    // Add shimmer
    float shimmer = noise(uv * 20.0 + t) * 0.15;
    color += shimmer * (uColor1 + uColor2) * 0.5;
    
    // Intensity and vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    color *= uIntensity * vignette;
    
    float alpha = (band1 + band2 + band3) * 0.5 + shimmer;
    alpha = clamp(alpha, 0.0, 0.8);
    
    gl_FragColor = vec4(color, alpha);
}
