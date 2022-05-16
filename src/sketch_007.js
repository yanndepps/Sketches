/*
 * Noise
 */

const canvasSketch = require('canvas-sketch');
const rnd = require('canvas-sketch-util/random');
const mth = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [512, 512],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
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
    const cols = params.cols; // columns
    const rows = params.rows; // rows
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
      const freq = params.freq;
      const amp = params.amp;
      // const scaleFactor = 30;

      // const n = rnd.noise2D(x + frame * 10, y, freq);
      const f = params.animate ? frame : params.frame;
      const n = rnd.noise3D(x, y, f * 10, freq);
      const angle = n * Math.PI * amp;
      // const scale = (n + 1) / 2 * scaleFactor; // one way to map our values in the range of 0 to 1
      // const scale = (n * 0.5 + 0.5) * scaleFactor; // another way to remap -1 and 1 to 0 and 1
      const scale = mth.mapRange(n, -1, 1, params.scaleMin, params.scaleMax); // and using an utility function

      // draw
      context.save();

      context.translate(x, y);
      // context.translate(margx, margy);
      // context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  // Grid
  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });
  // Noise
  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();

canvasSketch(sketch, settings);
