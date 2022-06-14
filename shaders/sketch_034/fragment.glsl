precision highp float;


uniform float time;
uniform vec2 u_resolution;
uniform vec4 color1;
uniform vec4 color2;

varying vec2 vUv;
varying vec3 vColor;

void main() {
  // gl_FragColor=vec4(vUv.y, 0.0, vUv.x, 1.0);
  // gl_FragColor=mix(color1, color2, vUv.x);
  gl_FragColor=vec4(vColor, 1.0);
}
