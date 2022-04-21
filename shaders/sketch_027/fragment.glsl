precision highp float;

#define PI 3.14159265359
#define S(a, b, t) smoothstep(a, b, t)
#define sat(x) clamp(x, 0., 1.)

uniform float time;
uniform vec2 u_resolution;

float remap01(float a, float b, float t) {
    return sat((t-a)/(b-a));
}

float remap(float a, float b, float c, float d, float t) {
    return sat((t-a)/(b-a)) * (d-c) + c;
}

vec4 Eye(vec2 uv) {
    vec4 col = vec4(0.);
    return col;
}

vec4 Mouth(vec2 uv) {
    vec4 col = vec4(0.);
    return col;
}

vec4 Head(vec2 uv) {
    vec4 col = vec4(.9, .65, .1, 1.);
    float d = length(uv);
    col.a = S(.4, .39, d);
    float edgeShade = remap01(.25, .4, d);
    edgeShade *= edgeShade;
    col.rgb *= 1. - edgeShade * .5;

    // outline
    col.rgb = mix(col.rgb, vec3(.6, .3, .1), S(.37, .38, d));

    // highlight
    float highlight = S(.31, .305, d);
    highlight *= remap(.31, -.1, .75, 0., uv.y);
    col.rgb = mix(col.rgb, vec3(1.), highlight);

    return col;
}

vec4 Smiley(vec2 uv) {
    // vec4 col = vec4(1., 0., 1., 1.);
    vec4 col = vec4(0., 0., 0., 1.);
    vec4 head = Head(uv);
    col = mix(col, head, head.a);
    return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5; // 0 <-> 1
  uv -= 0.5; // -0.5 <-> 0.5

  gl_FragColor = Smiley(uv);
}
