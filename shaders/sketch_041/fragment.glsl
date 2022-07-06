precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 baseColor = vec3(0.5);
    vec3 lighting = vec3(0.0);
    vec3 normal = normalize(vNormal);

    // ambient
    vec3 ambient = vec3(0.5);

    // hemi light
    vec3 skyColor = vec3(0.0, 0.3, 0.6);
    vec3 groundColor = vec3(0.6, 0.3, 0.1);
    float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    lighting = ambient * 0.0 + hemi;

    vec3 color = baseColor * lighting;

    // color = normal;

    gl_FragColor=vec4(color, 1.0);
}
