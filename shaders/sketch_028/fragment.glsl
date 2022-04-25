precision highp float;

#define PI 3.14159265359
#define S(a, b, t) smoothstep(a, b, t)

uniform float time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5;
  vec2 m = u_mouse.xy / u_resolution.xy;

  uv -= 0.5;
  vec3 col = vec3(0.);

  float r = .3;
  float b = m.y * r;

  uv.x *= .7;
  uv.y -= sqrt(abs(uv.x)) * .5;

  float d = length(uv);
  float c = S(r, r-b, d);
  col = vec3(c);

  gl_FragColor=vec4(col, 1.0);
}
