precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;
uniform samplerCube specMap;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

vec3 linearTosRGB(vec3 value) {
    vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
    vec3 v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);
    return mix(v2, v1, lt);
}

void main() {
    vec3 baseColor = vec3(0.5);
    vec3 lighting = vec3(0.0);
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);

    // ambient
    vec3 ambient = vec3(0.5);

    // hemi light
    vec3 skyColor = vec3(0.0, 0.3, 0.6);
    vec3 groundColor = vec3(0.6, 0.3, 0.1);
    float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    // diffuse lighting
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 lightColor = vec3(1.0, 1.0, 0.9);
    float dp = max(0.0, dot(lightDir, normal));

    // toon
    // dp *= step(0.5, dp);
    dp *= smoothstep(0.5, 0.505, dp);

    vec3 specular = vec3(0.0);
    vec3 diffuse = dp * lightColor;

    // specular
    vec3 r = normalize(reflect(-lightDir, normal));
    float phongValue = max(0.0, dot(viewDir, r));
    phongValue = pow(phongValue, 128.0);
    specular += phongValue;
    specular = smoothstep(0.5, 0.51, specular);

    // fresnel
    float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
    fresnel = pow(fresnel, 2.0);
    fresnel *= step(0.6, fresnel);

    lighting = hemi * (fresnel + 0.2) + diffuse * 0.8;

    vec3 color = baseColor * lighting + specular;

    gl_FragColor=vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
}
