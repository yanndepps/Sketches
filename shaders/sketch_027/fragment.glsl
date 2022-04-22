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

vec2 within(vec2 uv, vec4 rect) {
    return (uv-rect.xy)/(rect.zw-rect.xy);
}

vec4 Eye(vec2 uv) {
    uv -= .5;
    float d = length(uv);

    vec4 irisCol = vec4(.3, .5, 1., 1.);
    vec4 col = mix(vec4(1.), irisCol, S(.1, .7, d)*.5);

    // edge shadow
    col.rgb *= 1. - S(.35, .4, d) * .5 * sat( - uv.y - uv.x );
    // iris outline
    col.rgb = mix(col.rgb, vec3(0.), S(.3, .28, d));
    irisCol.rgb *= 1. + S(.3, .05, d);
    col.rgb = mix(col.rgb, irisCol.rgb, S(.28, .25, d));

    // pupil
    col.rgb = mix(col.rgb, vec3(0.), S(.16, .14, d));

    // highlight
    float highlight = S(.1, .09, length(uv-vec2(-.15, .15)));
    highlight += S(.07, .05, length(uv+vec2(-.08, .08)));
    col.rgb = mix(col.rgb, vec3(1.), highlight);

    col.a = S(.4, .39, d);

    return col;
}

vec4 Mouth(vec2 uv) {
    uv -= .5;
    vec4 col = vec4(.5, .18, .05, 1.);
    uv.y *= 1.5;
    uv.y -= uv.x * uv.x * 2.;
    float d = length(uv);
    col.a = S(.3, .28, d);

    // teeth
    float td = length(uv-vec2(0., .5));
    vec3 toothCol = vec3(1.) * S(.4, .15, d);
    col.rgb = mix(col.rgb, toothCol, S(.4, .37, td));

    // tongue something
    td = length(uv + vec2(0., .5));
    col.rgb = mix(col.rgb, vec3(1., .5, .5), S(.5, .2, td));

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

    // sockets
    // TODO

    // cheek
    d = length(uv-vec2(.18, -.18));
    float cheek = S(.14, .01, d) * .4;
    cheek *= S(.12, .11, d);
    col.rgb = mix(col.rgb, vec3(1., .1, .1), cheek);

    return col;
}

vec4 Smiley(vec2 uv) {
    vec4 col = vec4(0., 0., 0., 1.);
    uv.x = abs(uv.x);

    vec4 head = Head(uv);
    vec4 eye = Eye(within(uv, vec4(.01, -.1, .30, .2)));
    vec4 mouth = Mouth(within(uv, vec4(-.3, -.4, .3, -.1)));

    col = mix(col, head, head.a);
    col = mix(col, eye, eye.a);
    col = mix(col, mouth, mouth.a);

    return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.yy + 0.5; // 0 <-> 1
  uv -= 0.5; // -0.5 <-> 0.5

  gl_FragColor = Smiley(uv);
}
