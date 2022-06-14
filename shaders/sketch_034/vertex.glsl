precision highp float;

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vColor;

attribute vec3 deppsColors;

void main(){
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
  vUv = uv;
  vColor = deppsColors;
}
