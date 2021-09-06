const canvasSketch = require('canvas-sketch');
const rndm = require('canvas-sketch-util/random');
const p5 = require('p5');
new p5();

// random seed to freeze the outputs
// const defaultSeed = 'folds_082721';
// const defaultSeed = '';
// rndm.setSeed(defaultSeed || rndm.getRandomSeed());
// console.log('random seed -> ', rndm.getSeed());

const settings = {
  p5: true,
  hotkeys: true,
  // suffix: rndm.getSeed(),
  dimensions: [600, 600],
  animate: true,
  context: '2d'
};

let x1, y1, x2, y2; // function domain
let step; // step within domain
let y;
let go = true;

// pdj parameters
// let pdj_a = 0.1;
// let pdj_b = 1.9;
// let pdj_c = -0.8;
// let pdj_d = -1.2;

let pdj_a = rndm.range(-3.0, 3.0);
let pdj_b = rndm.range(-3.0, 3.0);
let pdj_c = rndm.range(-3.0, 3.0);
let pdj_d = rndm.range(-3.0, 3.0);

// sech parameters
const cosh = x => 0.5 * (exp(x) + exp(-x));
const sinh = x => 0.5 * (exp(x) - exp(-x));


const sketch = () => {
  // Setup
  // consistant sizing regardless of portrait/landscape modes
  const dim = min(width, height);
  const ns = dim * 0.0015;
  // console.log('new size ->', ns);

  background(250);
  smooth();
  noFill();
  stroke(20, 15);
  strokeWeight(ns);

  x1 = y1 = -3;
  x2 = y2 = 3;
  y = y1;
  step = (x2 - x1) / (2.321 * width);

  return () => {
    // Draw
    if (go) {
      for (let i = 0; (i < 20) & go; i++) {
        for (let x = x1; x <= x2; x += step) {
          drawVariation(x, y);
        }
        y += step;
        if (y > y2) {
          go = false;
          console.log('done');
        }
      }
    }
  };
};

function drawVariation(x, y) {
  let v = createVector(x, y);
  let amount = 1.0;

  // v = sinusoidal(v, amount);
  // v = hyperbolic(v, amount);
  // v = pdj(v, amount);
  // v = julia(v, amount);
  // v = sech(v, amount);

  // v = julia(sech(v, amount), amount);

  // for (let i = 0; i < 5; i++) {
  //   v = hyperbolic(v, amount);
  // }
  v = d_pdj(v, amount);

  let xx = map(v.x + 0.003 * randomGaussian(), x1, x2, 20, width - 20);
  let yy = map(v.y + 0.003 * randomGaussian(), y1, y2, 20, height - 20);
  point(xx, yy);
}

function sinusoidal(v, amount) {
  return new p5.Vector(amount * sin(v.x), amount * sin(v.y));
}

function hyperbolic(v, amount) {
  let r = v.mag() + 1.0e-10;
  let theta = atan2(v.x, v.y);
  let x = amount * sin(theta) / r;
  let y = amount * cos(theta) * r;
  return new p5.Vector(x, y);
}

function pdj(v, amount) {
  return new p5.Vector(
    amount * (sin(pdj_a * v.y) - cos(pdj_b * v.x)),
    amount * (sin(pdj_c * v.x) - cos(pdj_d * v.y))
  );
}

// TODO: fix this one
function d_pdj(v, amount) {
  let h = 0.1; // step
  let sqrth = sqrt(h);
  let vv = createVector(v.x + h, v.y + h);
  let v1 = pdj(v, amount);
  // let v2 = pdj(new p5.Vector(v.x + h, v.y + h), amount);
  let v2 = pdj(vv, amount);
  return new p5.Vector((v2.x - v1.x) / sqrth, (v2.y - v1.y) / sqrth);
}

function julia(v, amount) {
  let r = amount * sqrt(v.mag());
  let theta = 0.5 * atan2(v.x, v.y) + (int)(2.0 * rndm.range(0, 1)) * PI;
  let x = r * cos(theta);
  let y = r * sin(theta);
  return new p5.Vector(x, y);
}

function sech(p, weight) {
  let d = cos(2.0 * p.y) + cosh(2.0 * p.x);
  if (d != 0) d = weight * 2.0 / d;
  return new p5.Vector(d * cos(p.y) * cosh(p.x), -d * sin(p.y) * sinh(p.x));
}

canvasSketch(sketch, settings);
