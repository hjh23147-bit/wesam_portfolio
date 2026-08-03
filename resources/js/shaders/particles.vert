// GPU particle vertex shader
attribute float aSize;
attribute float aLife;
attribute vec3 aVelocity;
attribute vec3 aColor;

uniform float uTime;
uniform float uPixelRatio;

varying float vLife;
varying vec3 vColor;

void main() {
    vLife = aLife;
    vColor = aColor;
    
    // Animate position
    vec3 pos = position + aVelocity * mod(uTime + aLife * 10.0, 10.0);
    
    // Wrap around
    pos = mod(pos + 50.0, 100.0) - 50.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    float size = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    
    // Fade based on life
    float fade = sin(mod(uTime * 0.5 + aLife * 6.28, 6.28)) * 0.5 + 0.5;
    size *= (0.5 + fade * 0.5);
    
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
}
