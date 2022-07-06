precision highp float;

uniform float time;
uniform vec2 u_resolution;

varying vec3 vNormal;
varying vec3 vPosition;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

mat3 rotateY(float radians) {
    float s = sin(radians);
    float c = cos(radians);

    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

void main(){
    vec3 localSpacePosition = position;

    // localSpacePosition.y += sin(time);
    // localSpacePosition.xz *= remap(sin(time), -1.0, 1.0, 0.5, 1.5);
    localSpacePosition = rotateY(time) * localSpacePosition;

    gl_Position=projectionMatrix*modelViewMatrix*vec4(localSpacePosition,1.0);
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}
