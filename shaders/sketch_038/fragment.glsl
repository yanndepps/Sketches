precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;

vec3 red = vec3(1.0, 0.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);
vec3 yellow = vec3(1.0, 1.0, 0.0);

void main() {
  vec3 color = vec3(0.0);

  gl_FragColor=vec4(color, 1.0);
}
