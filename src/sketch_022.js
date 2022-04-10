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
  dimensions: [550, 550],
  context: '2d',
  animate: false
};

const sketch = () => {
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  return ({ width, height }) => {
    background(0, 0, 80);
    noLoop();
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
  let step = int(random(2, 5));
  let d = w / step;
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let x2 = x + i * d;
      let y2 = y + j * d;
      if (random() < 0.9 && d > minW) {
        separateGrid(x2, y2, d, minW);
      } else {
        if (random() > 0.5) {
          line(x2, y2, x2 + d, y2 + d);
          strokeWeight(1);
        } else {
          line(x2 + d, y2, x2, y2 + d);
          strokeWeight(2);
        }
        // noFill();
        // rect(x2, y2, d, d);
      }
    }
  }
}

canvasSketch(sketch, settings);
