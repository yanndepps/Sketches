/*
 * Live Coding Session 012
 * © shunsuke takawo
 * Recoded
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
// const { lerp } = require('canvas-sketch-util/math');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [1024, 1024],
  context: '2d',
  animate: false
};

let nColor = rnd.rangeFloor(2, 11);
let palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);
// let color = rnd.pick(palette);
// let palette = ["#f94144",
//   "#f3722c",
//   "#f8961e",
//   "#f9c74f",
//   "#f9844a",
//   "#90be6d",
//   "#43aa8b",
//   "#4d908e",
//   "#577790",
//   "#277da1"];

const sketch = () => {
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  // stroke(0, 0, 20, 100);
  // strokeWeight(0.25);
  smooth(2);
  // ---
  return ({ width, height }) => {
    background(palette[0]);
    // background(0, 0, 20, 100);
    angleMode(DEGREES);
    // ---
    let offset = width / 15;
    let x = offset;
    let y = offset;
    let w = width - offset * 2;
    let minW = w / 5;
    // ---
    separateGrid(x, y, w, minW);
  };
};

function separateGrid(x, y, w, minW) {
  let step = int(random(1, 5));
  let d = ceil(w / step);
  // console.log('d -> ', d);
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let x2 = ceil(x + i * d);
      // console.log(x2);
      let y2 = ceil(y + j * d);
      if (random() < 0.9 && d > minW) {
        separateGrid(x2, y2, d, minW);
      } else {
        drawShapes(x2 + d / 2, y2 + d / 2, d);
      }
    }
  }
}

function drawShapes(cx, cy, d) {
  push();
  translate(cx, cy);
  // scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  rotate(int(random(4)) * 360 / 4);
  // rotate -> [ 0, 90, 180, 270 ]
  // triangle(-d / 2, -d / 2, -d / 2, d / 2, d / 2, -d / 2);

  let shapeNum = int(random(4));
  switch (shapeNum) {
    case 0:
      separateCircle(0, 0, d, random([2, 4]));
      break;
    case 1:
      push();
      translate(-d / 2, 0);
      rotate(-90);
      separateArc(0, 0, d, d, 0, 180, PIE, int(random(2, 5)));
      pop();
      // ---
      push();
      translate(d / 2, 0);
      rotate(90);
      separateArc(0, 0, d, d, 0, 180, PIE, int(random(2, 5)));
      pop();
      break;
    case 2:
      push();
      translate(-d / 2 / 2, 0);
      scale(random() > 0.5 ? -1 : 1, 1);
      translate(-d / 2 / 2, 0);
      rotate(-90);
      separateArc(0, 0, d, d, 0, 180, PIE, int(random(2, 5)));
      pop();
      // ---
      push();
      translate(d / 2 / 2, 0);
      scale(random() > 0.5 ? -1 : 1, 1);
      translate(-d / 2 / 2, 0);
      rotate(-90);
      separateArc(0, 0, d, d, 0, 180, PIE, int(random(2, 5)));
      pop();
      break;
    case 3:
      for (let i = 0; i < 4; i++) {
        push();
        rotate(i * 360 / 4);
        translate(-d / 2 / 2, -d / 2 / 2);
        rotate(int(random(4)) * 360 / 4);
        translate(-d / 2 / 2, -d / 2 / 2);
        setConicGradient(0, 0, 0, shuffle(palette.concat()));
        arc(0, 0, d, d, 0, 90, PIE);
        pop();
      }
      break;
  }
  pop();
}

function separateCircle(x, y, d, step) {
  push();
  translate(x, y);
  circle(0, 0, d);
  // ---
  let angleStep = 360 / step;
  for (let i = 0; i < step; i++) {
    push();
    rotate(i * angleStep);
    setConicGradient(0, 0, 0, shuffle(palette.concat()));
    arc(0, 0, d, d, 0, angleStep, PIE);
    pop();
  }
  pop();
}

function separateArc(x, y, w, h, startAngle, endAngle, type, step) {
  push();
  translate(x, y);
  let angleStep = (endAngle - startAngle) / step;
  for (let i = 0; i < step; i++) {
    // rotate(startAngle + i * angleStep);
    setConicGradient(0, 0, 0, shuffle(palette.concat()));
    arc(0, 0, w, h, startAngle + i * angleStep, startAngle + (i + 1) * angleStep, type);
  }
  pop();
}

function setConicGradient(angle, x, y, palette) {
  let gradient = drawingContext.createConicGradient(angle, x, y);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.8, palette[1]);
  drawingContext.fillStyle = gradient;
}

canvasSketch(sketch, settings);
