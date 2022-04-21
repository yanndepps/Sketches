precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

void main() {
  // vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  // multiply one of the axes by the aspect ratio
  // uv.x *= u_resolution.x/u_resolution.y;

  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5; // 0 <-> 1
  uv -= 0.5; // -0.5 <-> 0.5

  float d = length(uv);
  float r = 0.3;
  float c = smoothstep(r, r-0.005, d);

  gl_FragColor=vec4(vec3(c), 1.0);
}
