#pragma glslify: snoise = require(glsl-noise/simplex/2d)

precision highp float;

uniform float time;
uniform vec2 u_resolution;

uniform vec3 uColor;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uNoiseScale;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

vec3 light_reflection(vec3 lightColor) {
    // ambient is just the light's color
    vec3 ambient = lightColor;
    // diffuse calculations
    // calculate the cosine of the angle between the vertex's normal
    // vector and the vector going to the light
    vec3 diffuse = lightColor * max(dot(vSurfaceToLight, vNormal), 0.0);
    // combine
    return (ambient + diffuse);
}

void main() {
  // ambient light + intensity
  vec3 light_value = light_reflection(uLightColor);
  light_value *= uLightIntensity;
  // grain
  vec2 uv = gl_FragCoord.xy;
  uv /= uNoiseScale;

  vec3 noiseColors = vec3(snoise(uv) * 0.5 + 0.5);
  noiseColors *= pow( light_value.r, 5.0 );

  // clamp with the unique color
  gl_FragColor.r = max(noiseColors.r, uColor.r);
  gl_FragColor.g = max(noiseColors.g, uColor.g);
  gl_FragColor.b = max(noiseColors.b, uColor.b);
  gl_FragColor.a = 1.0;
}
