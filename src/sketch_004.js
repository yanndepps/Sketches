/*
 * Grid of Squares
 */
const canvasSketch = require('canvas-sketch');
const rndm = require('canvas-sketch-util/random');

const settings = {
  dimensions: [600, 600]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // consistant sizing regardless of portrait/landscape modes
    const dim = Math.min(width, height);
    const ns = dim * 0.00167;
    // console.log('new size ->', ns);
    // white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // a grid of rects
    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.18;
    const iy = width * 0.18;
    const off = width * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        // large rects
        context.lineWidth = ns;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        // small rects at random
        if (rndm.range(0, 1) > 0.5) {
          context.lineWidth = ns * 0.75;
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
