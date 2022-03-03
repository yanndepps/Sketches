/*
 * akella : 20.02.2022 -> #1
 * Beautiful Noise with Three.js
 * Recoded -> https://www.youtube.com/watch?v=sPBb-0al7Y0
 */

global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/shaders/CopyShader");
// ---
const canvasSketch = require('canvas-sketch');
// ---
const { DotScreenShader } = require('../shaders/sketch_013/CustomShader');
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/postprocessing/ShaderPass');
// ---
import fragment_01 from '../shaders/sketch_013/fragment_01.glsl';
import vertex_01 from '../shaders/sketch_013/vertex_01.glsl';
import fragment_02 from '../shaders/sketch_013/fragment_02.glsl';
import vertex_02 from '../shaders/sketch_013/vertex_02.glsl';
// ---
import GUI from 'lil-gui';
const gui = new GUI();
// gui.add(document, 'title');
// ---
const settings = {
  dimensions: [1024, 1024],
  animate: true,
  context: "webgl",
  attributes: {
    antialias: true
  }
};


function sketch({ context }) {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, 0.8);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Something about tCube
  // render our scene again but from inside our
  // first sphere, adding true reflections
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      encoding: THREE.sRGBEncoding
    }
  );

  const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);

  // Setup first geometry
  const geo_01 = new THREE.SphereBufferGeometry(1.5, 32, 32);
  // shader material -> first geometry
  const shdrmat_01 = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      // playhead: { type: "f", value: 0.0 },
      time: { type: "f", value: 0.0 },
      baseUVOffset: { value: 0.1 },
      basePatternOffset: { value: 0.5 },
      secondPatternOffset: { value: 0.1 },
      resolution: { value: new THREE.Vector4() },
    },
    // wireframe: false,
    // transparent: false,
    vertexShader: vertex_01,
    fragmentShader: fragment_01,
  });

  // Setup second geometry
  const geo_02 = new THREE.SphereBufferGeometry(0.2, 64, 64);
  // shader material -> second geometry
  const shdrmat_02 = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      // playhead: { type: "f", value: 0.0 },
      time: { type: "f", value: 0.0 },
      tCube: { value: 0.0 },
      mRefractionRatio: { value: 1.02 },
      mFresnelBias: { value: 0.1 },
      mFresnelScale: { value: 4. },
      mFresnelPower: { value: 2. },
      resolution: { value: new THREE.Vector4() },
    },
    // wireframe: false,
    // transparent: false,
    vertexShader: vertex_02,
    fragmentShader: fragment_02,
  });

  // Setup a mesh with geo_01 + material
  const mesh_01 = new THREE.Mesh(geo_01, shdrmat_01);
  scene.add(mesh_01);
  // Setup a mesh with geo_02 + material
  const mesh_02 = new THREE.Mesh(geo_02, shdrmat_02);
  scene.add(mesh_02);

  // Postprocessing
  const composer = new THREE.EffectComposer(renderer);
  const initPost = () => {
    composer.addPass(new THREE.RenderPass(scene, camera));

    const effect = new THREE.ShaderPass(DotScreenShader);
    effect.uniforms['scale'].value = 4;
    composer.addPass(effect);
  };

  initPost();

  // GUI
  let obj = {
    mRefractionRatio: 1.02,
    mFresnelBias: 0.1,
    mFresnelScale: 4.0,
    mFresnelPower: 2.0,
    baseUVOffset: 0.1,
    basePatternOffset: 0.5,
    secondPatternOffset: 0.1,
  }

  // panel 01 -> fragment 02
  gui.add(obj, 'mRefractionRatio', 0, 1.5, 0.01).onChange(v => {
    shdrmat_02.uniforms.mRefractionRatio.value = v;
  });
  gui.add(obj, 'mFresnelBias', 0, 1, 0.01).onChange(v => {
    shdrmat_02.uniforms.mFresnelBias.value = v;
  });
  gui.add(obj, 'mFresnelScale', 0, 4, 0.01).onChange(v => {
    shdrmat_02.uniforms.mFresnelScale.value = v;
  });
  gui.add(obj, 'mFresnelPower', 1, 3, 0.01).onChange(v => {
    shdrmat_02.uniforms.mFresnelPower.value = v;
  });
  // panel 02 -> fragment 01
  gui.add(obj, 'baseUVOffset', 0, 1, 0.01).onChange(v => {
    shdrmat_01.uniforms.baseUVOffset.value = v;
  });
  gui.add(obj, 'basePatternOffset', 0, 1, 0.01).onChange(v => {
    shdrmat_01.uniforms.basePatternOffset.value = v;
  });
  gui.add(obj, 'secondPatternOffset', 0, 1, 0.01).onChange(v => {
    shdrmat_01.uniforms.secondPatternOffset.value = v;
  });

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      // shdrmat_01.uniforms.resolution.value.x = viewportWidth;
      // shdrmat_01.uniforms.resolution.value.y = viewportHeight;
      composer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh_02.visible = false;
      cubeCamera.update(renderer, scene);
      mesh_02.visible = true;
      shdrmat_02.uniforms.tCube.value = cubeRenderTarget.texture;
      shdrmat_01.uniforms.time.value = time * (Math.PI * 0.125);
      controls.update();
      // renderer.render(scene, camera);
      composer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
}

canvasSketch(sketch, settings);
