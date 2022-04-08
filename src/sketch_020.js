const canvasSketch = require('canvas-sketch');
const Hydra = require('hydra-synth');

// utility functions
function random(min, max) {
  let rand = Math.random();
  if (typeof min === "undefined") {
    return rand;
  } else if (typeof max === "undefined") {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      const tmp = min;
      min = max;
      max = tmp;
    }
    return rand * (max - min) + min;
  }
}

function map(current, in_min, in_max, out_min, out_max) {
  return (current - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

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

  // sketch
  osc(9, 2, 2) // 80, 2, 2
    .modulateRotate(osc(5, 1))
    .out();

  return ({ context, width, height, deltaTime }) => {
    hydra.tick(deltaTime * 100);
  };
};

canvasSketch(sketch, settings);
