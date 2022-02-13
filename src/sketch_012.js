/*
 * Crack 01
 * Recoded from https://openprocessing.org/crayon/24/
 */

const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  animate: true,
  context: '2d',
  dimensions: [1024, 1024],
  // unit: "in",
  attributes: {
    antialias: true
  }
};

const params = {
  seed: Math.floor(Math.random() * 1000)
}

// OPC start
// let seed = Math.floor(Math.random() * 1000);
let seed = params.seed;
let lines = Math.floor(Math.random() * 6 + 4);
let noise_Strength = (Math.floor(Math.random() * 10) * 10) + 50;
// OPC end
let pSeed = seed;
let pLines = lines;
let pNoise_Strength = noise_Strength;
let colors = [];
let size;

// pane

const sketch = () => {
  generate();
  return ({ context, width, height }) => {
    if (params.seed != pSeed || pLines != lines || pNoise_Strength != pNoise_Strength) {
      generate();
    }
  };
};

function generate() {
  size = min(width, height);
  pSeed = params.seed;
  pLines = lines;
  pNoise_Strength = noise_Strength;
  randomSeed(seed);
  // colors = ["#333333", "#ed3441", "#ffd630", "#329fe3", "#154296"];
  colors = ["#ffffff", "#ed3441", "#ffd630", "#329fe3", "#154296"];
  shuffle(colors, true);
  background(colors[1]);
  colors.splice(1, 1);
  translate(width / 2, height / 2);
  scale(0.7);
  translate(-width / 2, -height / 2);
  let num = lines;
  for (let i = 0; i < num; i++) {
    let y = map(i, 0, num - 1, 0, height);
    let col = color(colors[i % colors.length]);
    col.setAlpha(255);
    stroke(col);
    strokeWeight(size * 0.001);
    line(0, y, width, y);
    stroke(col);
    let g = width * 0.001;
    strokeWeight(size * 0.0002);
    for (let j = 0; j < width; j += g) {
      noiseCurve(j, y);
    }
  }
}

function noiseCurve(x, y) {
  let c = size * 0.15;
  let step = size * 0.01;
  let amt = size / 900;
  noFill();
  beginShape();
  for (let i = 0; i < c; i += amt) {
    let scl = 0.0005 / (size * 0.002);
    let str = noise(x * scl, y * scl, params.seed) * noise_Strength;
    let angle = noise(x * scl, y * scl, i * 0.0002) * str;
    vertex(x, y);
    x += cos(angle) * step;
    y += sin(angle) * step;
  }
  endShape();
}

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: 'parameters' });
  folder.addInput(params, 'seed', { min: 0, max: 1000, step: 1 });
};

createPane();

canvasSketch(sketch, settings);
