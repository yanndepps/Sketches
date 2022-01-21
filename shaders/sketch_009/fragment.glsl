precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

void main() {
  // vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5;
  vec3 color = vec3(1.0, 1.0, 0.0);

  gl_FragColor=vec4(color, 1.0);
}
