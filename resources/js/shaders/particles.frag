// GPU particle fragment shader
varying float vLife;
varying vec3 vColor;

void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Soft glow falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= alpha;
    
    // Core brightness
    float core = 1.0 - smoothstep(0.0, 0.15, dist);
    
    vec3 color = vColor + vec3(1.0) * core * 0.5;
    
    gl_FragColor = vec4(color, alpha * 0.8);
}
