precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0);
  // color = vec3(step(0.25, vUv.x));
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);

  // color = mix(red, blue, vUv.x);
  // color = vec3(vUv.x);
  // color = vec3(smoothstep(0.0, 1.0, 1.0 - vUv.x));
  color = mix(red, blue, smoothstep(0.0, 1.0, vUv.x));

  gl_FragColor=vec4(color, 1.0);
}
