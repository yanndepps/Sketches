const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const { mapRange } = require('canvas-sketch-util/math');
const Hydra = require('hydra-synth');

const settings = {
  dimensions: [1024, 1024],
  context: 'webgl',
  animate: true,
  fps: 30,
  duration: 30
};

const sketch = (initialProps) => {
  // console.log(initialProps);
  // init hydra
  const hydra = new Hydra({
    canvas: initialProps.canvas,
    autoLoop: false,
    detectAudio: false,
    makeGlobal: true
  });
  // console.log(hydra);

  // hydra sketch
  osc(9, 2, 2) // 80, 2, 2
    .modulateRotate(osc(5, 1))
    .out();

  return ({ context, width, height, deltaTime }) => {
    hydra.tick(deltaTime * 100);
  };
};

canvasSketch(sketch, settings);
