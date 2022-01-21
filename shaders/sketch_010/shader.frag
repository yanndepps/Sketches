#ifdef GL_ES
precision mediump float;
#endif

// #define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // vec3 color = vec3(0.0, 0.0, 1.0);
    gl_FragColor = vec4(st.x, 0.0, 0.0, 1.0);
}
