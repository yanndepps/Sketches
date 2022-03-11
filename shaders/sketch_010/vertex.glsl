precision highp float;

uniform float time;
uniform vec2 u_resolution;
uniform vec3 uLightPos;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

void main(){
  vNormal = normalize(normalMatrix * normal);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
  // general calculations needed for diffuse lighting
  // calculate a vector from the fragment location to the light source
  vec3 surfaceToLightDirection = vec3( modelViewMatrix * vec4(position, 1.0) );
  vec3 worldLightPos = vec3( viewMatrix * vec4(uLightPos, 1.0) );
  vSurfaceToLight = normalize(worldLightPos - surfaceToLightDirection);
}
