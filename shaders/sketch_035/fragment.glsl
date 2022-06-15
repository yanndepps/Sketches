precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

uniform sampler2D diffuse;
uniform vec4 tint;

varying vec2 vUv;


void main() {
    vec4 diffuseSample = texture2D(diffuse, vUv);
    // vec4 diffuseSample = texture2D(diffuse, vec2(vUv.x, 1.0 - vUv.y)); // flip

    // gl_FragColor=diffuseSample;
    gl_FragColor=diffuseSample * tint; // tint the image
    // gl_FragColor=vec4(diffuseSample.r, 0.0, 0.0, 1.0 ); // red channel only
}
