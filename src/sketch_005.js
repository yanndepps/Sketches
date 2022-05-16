/*
 * Transforms
 */

const canvasSketch = require('canvas-sketch');
const mth = require('canvas-sketch-util/math');
const rnd = require('canvas-sketch-util/random');

const settings = {
  // dimensions: [1080, 1080]
  dimensions: [512, 512]
};

// const degToRad = degrees => degrees / 180 * Math.PI;

// const rndRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    // consistant sizing regardless of portrait/landscape modes
    const dim = Math.min(width, height);
    const ns = Math.floor(dim * 0.0016);
    // console.log('new size ->', ns);
    // background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    // draw
    context.fillStyle = 'white';
    context.strokeStyle = 'white';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 28;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = mth.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(rnd.range(0.1, 3), rnd.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, rnd.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      // arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = rnd.range(2, 20);
      context.beginPath();
      context.arc(0, 0, radius * rnd.range(0.7, 1.3), slice * rnd.range(1, -8), slice * rnd.range(1, -5));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
