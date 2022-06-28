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
  vec3 color = vec3(0.0);
  // float t1 = sin(vUv.x * 100.0);
  // float t2 = sin(vUv.y * 100.0);

  // color = vec3(t1 * t2);
  // color = vec3(max( t1, t2 ));

  float t1 = remap(sin(vUv.y * 400.0 + time * 10.0), -1.0, 1.0, 0.9, 1.0);
  float t2 = remap(sin(vUv.y * 50.0 - time * 2.0), -1.0, 1.0, 0.9, 1.0);
  color = texture2D(diffuse1, vUv).xyz * t1 * t2;

  gl_FragColor=vec4(color, 1.0);
}
