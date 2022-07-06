/*
 * GLSL from Scratch
 * section 07 -> vertex shaders
 */

const THREE = global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/loaders/GLTFLoader.js");

const fragment = require("../shaders/sketch_046/fragment.glsl");
const vertex = require("../shaders/sketch_046/vertex.glsl");

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
  camera.position.set(0, 0, -4.4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // textures
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "../assets/sketch_046/res/Cold_Sunset__Cam_2_Left+X.png",
    "../assets/sketch_046/res/Cold_Sunset__Cam_3_Right-X.png",
    "../assets/sketch_046/res/Cold_Sunset__Cam_4_Up+Y.png",
    "../assets/sketch_046/res/Cold_Sunset__Cam_5_Down-Y.png",
    "../assets/sketch_046/res/Cold_Sunset__Cam_0_Front+Z.png",
    "../assets/sketch_046/res/Cold_Sunset__Cam_1_Back-Z.png",
  ]);

  scene.background = texture;


  // Setup a geometry
  // const geometry = new THREE.PlaneBufferGeometry(4, 4);
  const geometry = new THREE.BoxGeometry(1, 1);

  // shader material
  const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      // playhead: { type: "f", value: 0.0 },
      time: { type: "f", value: 0.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      specMap: { value: scene.background },
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

  // const gfLoader = new THREE.GLTFLoader().setPath('../assets/sketch_046/res/');
  // gfLoader.load('suzanne.glb', (gltf) => {
  //   gltf.scene.traverse(c => {
  //     c.material = material;
  //   });
  //   scene.add(gltf.scene);
  // });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      material.uniforms.u_resolution.value.x = viewportWidth;
      material.uniforms.u_resolution.value.y = viewportHeight;
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      material.uniforms.time.value = time * (Math.PI * 0.5);
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
