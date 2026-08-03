// Glass refraction fragment shader
uniform float uTime;
uniform float uIor;
uniform float uChromaticAberration;
uniform vec3 uTint;
uniform float uFresnelPower;
uniform sampler2D uEnvMap;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
    
    // Chromatic aberration refraction
    float iorR = uIor;
    float iorG = uIor + uChromaticAberration * 0.01;
    float iorB = uIor + uChromaticAberration * 0.02;
    
    vec3 refractR = refract(-viewDir, normal, 1.0 / iorR);
    vec3 refractG = refract(-viewDir, normal, 1.0 / iorG);
    vec3 refractB = refract(-viewDir, normal, 1.0 / iorB);
    
    vec2 uvR = vUv + refractR.xy * 0.1;
    vec2 uvG = vUv + refractG.xy * 0.1;
    vec2 uvB = vUv + refractB.xy * 0.1;
    
    // Simulate environment reflection
    float r = sin(uvR.x * 10.0 + uTime) * 0.5 + 0.5;
    float g = sin(uvG.x * 10.0 + uTime * 1.1) * 0.5 + 0.5;
    float b = sin(uvB.x * 10.0 + uTime * 1.2) * 0.5 + 0.5;
    
    vec3 refractedColor = vec3(r, g, b) * 0.3;
    
    // Glass tint
    vec3 color = mix(refractedColor, uTint, 0.3);
    
    // Fresnel rim glow
    color += fresnel * uTint * 2.0;
    
    // Edge glow
    float edge = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
    color += edge * uTint * 0.5;
    
    float alpha = 0.15 + fresnel * 0.6 + edge * 0.2;
    
    gl_FragColor = vec4(color, alpha);
}
