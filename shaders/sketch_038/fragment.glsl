precision highp float;

#define PI 3.14159265359

uniform float time;
uniform vec2 u_resolution;

varying vec2 vUv;

vec3 red = vec3(1.0, 0.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);
vec3 yellow = vec3(1.0, 1.0, 0.0);

void main() {
  vec3 color = vec3(0.75);

  // grid
  vec2 center = vUv - 0.5;
  vec2 cell = fract(center * u_resolution / 50.0);
  cell = abs(cell - 0.5);
  float distToCell = 1.0 - 2.0 * max(cell.x, cell.y);
  float cellLine = smoothstep(0.0, 0.05, distToCell);

  float xAxis = smoothstep(0.0, 0.002, abs(vUv.y - 0.5));
  float yAxis = smoothstep(0.0, 0.002, abs(vUv.x - 0.5));

  // lines
  vec2 pos = center * u_resolution / 50.0;
  float value_1 = pos.x;
  // float value_2 = abs( pos.x );
  // float value_2 = floor( pos.x );
  // float value_2 = ceil( pos.x );
  // float value_2 = floor(pos.x + 0.5); // fix for round() error ...
  // float value_2 = fract( pos.x );
  // float value_2 = mod( pos.x, 1.0 ); // same as fract
  float value_2 = mod( pos.x, 1.41 );
  float functionLine_1 = smoothstep(0.0, 0.075, abs(pos.y - value_1));
  float functionLine_2 = smoothstep(0.0, 0.075, abs(pos.y - value_2));

  // colors
  color = mix(black, color, cellLine);
  color = mix(blue, color, xAxis);
  color = mix(blue, color, yAxis);
  color = mix(yellow, color, functionLine_1);
  color = mix(red, color, functionLine_2);

  gl_FragColor=vec4(color, 1.0);
}
