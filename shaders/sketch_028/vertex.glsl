precision highp float;

uniform float time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main(){
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
