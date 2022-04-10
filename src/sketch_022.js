/*
 * Live Coding Session 012
 * © shunsuke takawo
 * Recoded
 */

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [1024, 1024],
  context: '2d',
  animate: true
};

const sketch = () => {
  return ({ width, height }) => {
    background(33);
  };
};

canvasSketch(sketch, settings);
