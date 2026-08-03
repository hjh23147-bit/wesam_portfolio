// Digital matrix rain fragment shader
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uDensity;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float character(vec2 uv, float n) {
    vec2 grid = floor(uv * vec2(4.0, 4.0));
    float val = step(0.5, hash(grid + n));
    vec2 f = fract(uv * vec2(4.0, 4.0));
    float bar = step(0.3, f.x) * step(f.x, 0.7);
    float dot_v = step(0.3, f.y) * step(f.y, 0.7);
    return val * bar * dot_v;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;
    
    // Column grid
    float columns = uDensity;
    vec2 gridUv = vec2(floor(uv.x * columns) / columns, uv.y);
    float columnId = floor(uv.x * columns);
    
    // Random speed per column
    float speed = hash(vec2(columnId, 0.0)) * 0.5 + 0.5;
    float offset = hash(vec2(columnId, 1.0));
    
    // Falling position
    float fall = fract(t * speed + offset);
    float y = fract(uv.y + fall);
    
    // Trail
    float trail = smoothstep(0.0, 0.8, y);
    float head = smoothstep(0.95, 1.0, y);
    
    // Character
    vec2 charUv = vec2(fract(uv.x * columns), fract(y * columns * 0.5));
    float charId = hash(vec2(columnId, floor(y * columns * 0.5) + floor(t)));
    float ch = character(charUv, charId);
    
    // Color
    vec3 color = uColor * trail * ch;
    color += uColor * 3.0 * head * ch;  // Bright head
    
    // Fade edges
    float fadeX = smoothstep(0.0, 0.02, fract(uv.x * columns)) *
                  smoothstep(1.0, 0.98, fract(uv.x * columns));
    color *= fadeX;
    
    float alpha = (trail * ch + head * ch * 2.0) * 0.8;
    
    gl_FragColor = vec4(color, alpha);
}
