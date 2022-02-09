/*
 * recode -> sketch1471694
 * made by twitter.com/mattywillo_
 * press space to pause the sketch on the current output
 * press n to regen immediately
 */

const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [512, 512],
  animate: true,
  context: '2d'
};

let th = 0.001955;
let dim;

const sketch = () => {
  background(33);
  dim = Math.min(width, height) * th;
  // console.log(dim);
  //---
  return ({ context, width, height }) => {
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  // fold_01
  folder = pane.addFolder({ title: 'grid_01' });
  // folder.addInput(___, 'name', { val:1, val:2 });
  // fold_02
  folder = pane.addFolder({ title: 'grid_02' });
}

// createPane();

canvasSketch(sketch, settings);
