precision highp float;

#define PI 3.14159265359
#define S(a, b, t) smoothstep(a, b, t)
#define HEART_COLOR vec3(1., .05, .05)

uniform float time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float smax(float a, float b, float k) {
    float h = clamp((b-a)/k + .5, 0., 1.);
    return mix(a, b, h) + h * (1. - h) * k * .5;
}

float heart(vec2 uv, float b) {
  float r = .25;
  b *= r;

  uv.x *= .7;
  uv.y -= smax( sqrt(abs(uv.x)) * .5, b, .1 );
  uv.y += .1 + b * .5;

  float d = length(uv);
  return S(r+b, r-b-.01, d);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5;
  uv -= 0.5;
  // vec2 m = u_mouse.xy / u_resolution.xy;
  vec2 m;
  m.y = (u_resolution.y - u_mouse.y) / u_resolution.y;
  m.y -= 0.5;

  vec3 col = vec3(0.);
  float c = heart(uv, m.y);
  col = vec3(c * HEART_COLOR);

  gl_FragColor=vec4(col, 1.0);
}
