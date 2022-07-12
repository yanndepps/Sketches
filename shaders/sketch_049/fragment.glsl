precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;
uniform samplerCube specMap;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;


float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 modelColor = vColor.xyz;
    vec3 lighting = vec3(0.0);

    // vec3 normal = normalize(vNormal);
    vec3 normal = normalize(cross(dFdx(vPosition.xyz), dFdy(vPosition.xyz)));
    vec3 viewDir = normalize(cameraPosition - vPosition);

    // ambient
    vec3 ambient = vec3(1.0);

    // hemi light
    vec3 skyColor = vec3(0.0, 0.3, 0.6);
    vec3 groundColor = vec3(0.6, 0.3, 0.1);
    float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    // diffuse lighting
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 lightColor = vec3(1.0, 1.0, 0.9);
    float dp = max(0.0, dot(lightDir, normal));

    vec3 specular = vec3(0.0);
    vec3 diffuse = dp * lightColor;

    // specular
    vec3 r = normalize(reflect(-lightDir, normal));
    float phongValue = max(0.0, dot(viewDir, r));
    phongValue = pow(phongValue, 32.0);
    specular += phongValue * 0.15;
    // specular = smoothstep(0.5, 0.51, specular);

    // IBL Specular
    vec3 iblCoord = normalize(reflect(-viewDir, normal));
    vec3 iblSample = textureCube(specMap, iblCoord).xyz;

    specular += iblSample * 0.5;

    // fresnel
    float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
    fresnel = pow(fresnel, 2.0);
    // fresnel *= step(0.6, fresnel);

    specular *= fresnel;

    // combine lightings
    lighting = hemi * 0.1 + diffuse;

    vec3 color = modelColor * lighting + specular;

    gl_FragColor=vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
}
