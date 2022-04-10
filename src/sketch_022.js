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
    background(0, 0, 60);
    noLoop();
    // ---
    let offset = width / 15;
    let x = offset;
    let y = offset;
    let w = width - offset * 2;
    let minW = w / 10;
    // ---
    separateGrid(x, y, w, minW);
  };
};

function separateGrid(x, y, w, minW) {
  let step = int(random(2, 5));
  let d = ceil(w / step);
  // console.log('d -> ', d);
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let x2 = x + i * d;
      let y2 = y + j * d;
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
  rotate(int(random(4)) * 360 / 4);
  // rotate([0, 90, 180, 270]);
  // arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90, PIE);
  triangle(-d / 2, -d / 2, -d / 2, d / 2, d / 2, -d / 2);
  pop();
}

canvasSketch(sketch, settings);
