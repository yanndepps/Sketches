precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

float Circle(vec2 uv, vec2 p, float r, float blur) {
  float d = length(uv - p);
  float c = smoothstep(r, r - blur, d);
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5; // 0 <-> 1
  uv -= 0.5; // -0.5 <-> 0.5

  vec3 col = vec3(.0);
  float mask = Circle(uv, vec2(.0), .35, .05);

  mask -= Circle(uv, vec2(-.1, .08), .06, .01);
  mask -= Circle(uv, vec2(.1, .08), .06, .01);

  float mouth = Circle(uv, vec2(.0), .3, .02);
  mouth -= Circle(uv, vec2(.0, 0.1), .3, .02);
  mask -= mouth;

  // col = vec3(mouth);
  col = vec3(1., 1., 0.) * mask;
  gl_FragColor=vec4(col, 1.0);
}
