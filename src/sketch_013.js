/*
 * 20.02.22 -> #1
 * Beautiful Noise with Three.js
 * Recoded -> https://www.youtube.com/watch?v=sPBb-0al7Y0
 */

global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragment from '../shaders/sketch_013/fragment.glsl';
import vertex from '../shaders/sketch_013/vertex.glsl';
import canvasSketch from 'canvas-sketch';
import GUI from 'lil-gui';
const gui = new GUI();
gui.add(document, 'title');

const settings = {
  dimensions: [640, 640],
  animate: true,
  context: "webgl",
  attributes: {
    antialias: true
  }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, 1.3);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  // const geometry = new THREE.PlaneBufferGeometry(4, 4);
  const geometry = new THREE.SphereBufferGeometry(1, 32, 32);

  // shader material
  const shdrmat = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      // playhead: { type: "f", value: 0.0 },
      time: { type: "f", value: 0.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      // colors: { type: "fv1", value: colors },
      uvRate1: {
        value: new THREE.Vector2(1, 1),
      },
    },
    wireframe: true,
    transparent: false,
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, shdrmat);
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      shdrmat.uniforms.resolution.value.x = viewportWidth;
      shdrmat.uniforms.resolution.value.y = viewportHeight;
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      shdrmat.uniforms.time.value = time * (Math.PI * 0.5);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
