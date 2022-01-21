/*
 * a template for both p5 and shaders
 * TODO: fix it, the vertex shader does not compile ...
 */

const canvasSketch = require('canvas-sketch');
const vert = require('../shaders/sketch_010/shader.vert');
const frag = require('../shaders/sketch_010/shader.frag');
const p5 = require('p5');
// new p5();

let theShader;
const preload = p5 => {
  // load shaders
  theShader = p5.loadShader(vert, frag);
};

const settings = {
  p5: { p5, preload },
  dimensions: [512, 512],
  animate: true,
  context: 'webgl',
  attributes: {
    antialias: true
  }
};


const sketch = ({ p5 }) => {
  p5.noStroke();
  return ({ p5, time, width, height }) => {
    theShader.setUniform('u_resolution', [width, height]);
    p5.shader(theShader);
    p5.background(33);
    p5.rect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
