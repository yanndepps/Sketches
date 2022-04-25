/*
 * The Art of Code -> Falling Heart FX
 * 7.47
 */

global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");

const fragment = require("../shaders/sketch_028/fragment.glsl");
const vertex = require("../shaders/sketch_028/vertex.glsl");

const canvasSketch = require("canvas-sketch");

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
      u_mouse: { type: "V2", value: new THREE.Vector2() },
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
    render({ time, viewportWidth, viewportHeight }) {
      shdrmat.uniforms.time.value = time * (Math.PI * 0.5);
      document.onmousemove = function(e) {
        shdrmat.uniforms.u_mouse.value.x = (e.clientX / viewportWidth) * 2 - 1;
        shdrmat.uniforms.u_mouse.value.y = ((e.clientY / viewportHeight) * 2 + 1) * 200;
        // console.log("x -> ", shdrmat.uniforms.u_mouse.value.x);
        // console.log("y -> ", shdrmat.uniforms.u_mouse.value.y);
      }
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
