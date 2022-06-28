precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;
uniform sampler2D diffuse1;

varying vec2 vUv;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 color = vec3(0.0);

  float t = sin(time);
  t = remap(t, -1.0, 1.0, 0.0, 1.0);

  color = mix(red, blue, t);

  gl_FragColor=vec4(color, 1.0);
}
