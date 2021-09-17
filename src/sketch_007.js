const canvasSketch = require('canvas-sketch');
const rnd = require('canvas-sketch-util/random');
const mth = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    // consistant sizing regardless of portrait/landscape modes
    const dim = Math.min(width, height);
    const ns = Math.floor(dim * 0.0016);
    // console.log('sizing ->', ns)
    // bg
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // describe our grid
    const cols = 10; // columns
    const rows = 10; // rows
    const numCells = cols * rows; // num of cells

    const gridw = width * 0.8; // width of the grid
    const gridh = height * 0.8; // height of the grid
    const cellw = gridw / cols; // width of each cell in the grid
    const cellh = gridh / rows; // height of each cell in the grid
    const margx = (width - gridw) * 0.5; // margin x ( difference between the size of the grid and the size of the canvas halved )
    const margy = (height - gridh) * 0.5; // margin y

    // go over each cell of the grid
    for (let i = 0; i < numCells; i++) {
      const col = i % cols; // use the remainder operator to calculate the columns
      const row = Math.floor(i / cols); // check the num of columns to find the end of a row

      const x = col * cellw + margx + (cellw * 0.5); // find the x and y values of each cell
      const y = row * cellh + margy + (cellh * 0.5);
      const w = cellw * 0.8; // to draw a line a bit smaller than the cell
      const h = cellh * 0.8;

      // add noise
      const freq = 0.001;
      const amp = 0.20;
      const scaleFactor = 30;
      const n = rnd.noise2D(x + frame * 10, y, freq);
      const angle = n * Math.PI * amp;
      // const scale = (n + 1) / 2 * scaleFactor; // one way to map our values in the range of 0 to 1
      // const scale = (n * 0.5 + 0.5) * scaleFactor; // another way to remap -1 and 1 to 0 and 1
      const scale = mth.mapRange(n, -1, 1, 1, scaleFactor); // and using an utility function

      // draw
      context.save();

      context.translate(x, y);
      // context.translate(margx, margy);
      // context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
