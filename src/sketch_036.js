/*
 * GLSL from Scratch
 * section 04 -> common functions and tricks
 */

global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");

const fragment = require("../shaders/sketch_036/fragment.glsl");
const vertex = require("../shaders/sketch_036/vertex.glsl");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [512, 512],
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
  // const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.PlaneBufferGeometry(4, 4);

  // shader material
  const shdrmat = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      // playhead: { type: "f", value: 0.0 },
      time: { type: "f", value: 0.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      // colors: { type: "fv1", value: colors },
      uvRate1: {
        value: new THREE.Vector2(1, 1),
      },
    },
    wireframe: false,
    transparent: false,
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, shdrmat);
  // mesh.position.set(0.5, 0.5, 0);
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      shdrmat.uniforms.u_resolution.value.x = viewportWidth;
      shdrmat.uniforms.u_resolution.value.y = viewportHeight;
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
