/*
 * Live Coding Session 012
 * © shunsuke takawo
 * Recoded
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  // dimensions: [550, 550],
  dimensions: [1024, 1024],
  context: '2d',
  animate: false
};

const nColor = rnd.rangeFloor(2, 6);
const palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);

const sketch = () => {
  // colorMode(HSB, 360, 100, 100);
  // stroke(0, 0, 30);
  angleMode(DEGREES);
  // noStroke();
  // ---
  // console.log(color);
  // console.log(palette);
  // ---
  return ({ width, height }) => {
    // background(0, 0, 30);
    background(palette[0]);
    let color = rnd.pick(palette);
    noLoop();
    // ---
    let offset = width / 15;
    let x = offset;
    let y = offset;
    let w = width - offset * 2;
    let minW = w / 5;
    // ---
    separateGrid(x, y, w, minW, color);
  };
};

function separateGrid(x, y, w, minW, cl) {
  fill(cl);
  let step = int(random(1, 5));
  let d = round(w / step);
  // console.log('d -> ', d);
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let x2 = x + i * d;
      let y2 = y + j * d;
      if (random() < 0.9 && d > minW) {
        separateGrid(x2, y2, d, minW, cl);
      } else {
        drawShapes(x2 + d / 2, y2 + d / 2, d, cl);
      }
    }
  }
}

function drawShapes(cx, cy, d, cl) {
  fill(cl);
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
      separateArc(-d / 2, 0, d, d, -90, -90 + 180, PIE, 2);
      separateArc(+d / 2, 0, d, d, 90, 90 + 180, PIE, 2);
      break;
    case 2:
      push();
      translate(-d / 2 / 2, 0);
      scale(random() > 0.5 ? -1 : 1, 1);
      separateArc(-d / 2 / 2, 0, d, d, -90, -90 + 180, PIE, 2);
      pop();
      // ---
      push();
      translate(+d / 2 / 2, 0);
      scale(random() > 0.5 ? -1 : 1, 1);
      separateArc(-d / 2 / 2, 0, d, d, -90, -90 + 180, PIE, 2);
      pop();
      break;
    case 3:
      for (let i = 0; i < 4; i++) {
        push();
        rotate(i * 360 / 4);
        translate(-d / 2 / 2, -d / 2 / 2);
        rotate(int(random(4)) * 360 / 4);
        arc(-d / 2 / 2, -d / 2 / 2, d, d, 0, 90, PIE);
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
  let angle = 360 / step;
  for (let i = 0; i < step; i++) {
    arc(0, 0, d, d, i * angle, (i + 1) * angle, PIE);
  }
  pop();
}

function separateArc(x, y, w, h, startAngle, endAngle, type, step) {
  push();
  translate(x, y);
  let angleStep = (endAngle - startAngle) / step;
  for (let i = 0; i < step; i++) {
    arc(0, 0, w, h, startAngle + i * angleStep, startAngle + (i + 1) * angleStep, type);
  }
  pop();
}

canvasSketch(sketch, settings);
