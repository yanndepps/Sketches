precision highp float;

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main(){
    vUv = uv;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}
