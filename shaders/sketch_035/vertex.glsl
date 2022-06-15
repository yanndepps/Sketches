precision highp float;

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
