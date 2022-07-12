precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;
uniform samplerCube specMap;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vColor;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 modelColor = vColor.xyz;

    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 blue = vec3(0.0, 0.0, 1.0);
    vec3 yellow = vec3(1.0, 1.0, 0.0);

    float value_1 = vColor.w;
    float line = smoothstep(0.003, 0.004, abs(vPosition.y - mix(-0.5, 0.0, value_1)));
    modelColor = mix(yellow, modelColor, line);

    // fragment shader part
    if (vPosition.y > 0.0) {
        float t = remap(vPosition.x, -0.5, 0.5, 0.0, 1.0);
        t = pow(t, 2.0);
        modelColor = mix(red, blue, t);

        float value_2 = t;
        float line_2 = smoothstep(0.003, 0.004, abs(vPosition.y - mix(0.0, 0.5, value_2)));
        modelColor = mix(yellow, modelColor, line_2);
    }

    // dividing line
    float middleLine = smoothstep(0.004, 0.005, abs(vPosition.y));
    modelColor = mix(vec3(0.0), modelColor, middleLine);


    vec3 lighting = vec3(0.0);
    vec3 normal = normalize(vNormal);
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
    specular += phongValue;
    // specular = smoothstep(0.5, 0.51, specular);

    // IBL Specular
    vec3 iblCoord = normalize(reflect(-viewDir, normal));
    vec3 iblSample = textureCube(specMap, iblCoord).xyz;

    specular += iblSample * 0.15;

    // fresnel
    float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
    fresnel = pow(fresnel, 2.0);
    // fresnel *= step(0.6, fresnel);

    specular *= fresnel;

    lighting = hemi * 0.1 + diffuse * 0.5;

    vec3 color = modelColor * lighting + specular;

    gl_FragColor=vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
}
