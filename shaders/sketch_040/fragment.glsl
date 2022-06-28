precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0);

  float value_1 = vUv.x;
  // float value_2 = smoothstep(0.0, 1.0, vUv.x);
  // float value_2 = pow(vUv.x, 0.25);
  float value_2 = vUv.x * (1.0 - vUv.x) * 4.0;

  float line = smoothstep(0.0, 0.005, abs( vUv.y - 0.5 ) );
  float linearLine = smoothstep(0.0, 0.005, abs(vUv.y - mix(0.5, 1.0, 1.0 - value_1)));
  float smoothLine = smoothstep(0.0, 0.005, abs(vUv.y - mix(0.0, 0.5, 1.0 - value_2)));

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 white = vec3(1.0, 1.0, 1.0);

  if (vUv.y > 0.5) {
      color = mix(red, blue, value_1);
  } else {
      color = mix(red, blue, value_2);
  }

  color = mix(white, color, line);
  color = mix(white, color, linearLine);
  color = mix(white, color, smoothLine);

  gl_FragColor=vec4(color, 1.0);
}
