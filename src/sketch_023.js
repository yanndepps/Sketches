/*
 * Live Coding Session 012
 * © shunsuke takawo
 * Recoded
 * Chromotome color palettes
 * https://kgolid.github.io/chromotome-site/
 */

const canvasSketch = require('canvas-sketch');
const tome = require('chromotome');
const p5 = require('p5');
new p5();

let palette = [];
let seed = Math.floor(Math.random() * 1000);

const settings = {
  suffix: seed,
  p5: true,
  dimensions: [1024, 1024],
  context: '2d',
  animate: false,
  attributes: {
    antialias: true
  }
};


const sketch = () => {
  smooth(6);
  // let colStr = tome.get("miradors").stroke;
  // console.log(palette.length);
  // console.log(colStr);
  // ---
  return ({ width, context }) => {
    randomSeed(seed);
    console.log(seed);
    colorMode(HSB, 360, 100, 100, 100);
    palette = shuffle(tome.get("rag-bangalore").colors);
    angleMode(DEGREES);
    // ---
    // background(palette[0]);
    // stroke(palette[0]);
    // strokeWeight(0.5);
    // background(0, 0, 20, 100);
    // ---
    shuffle(palette, true);
    // ---
    let gradient = context.createLinearGradient(0, 0, 0, height);
    noStroke();
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(0.35, palette[1]);
    context.fillStyle = gradient;
    rect(0, 0, width, height);
    // ---
    blendMode(ADD);
    background(0, 0, 30, 30);
    blendMode(BLEND);
    // ---
    let offset = width / 15;
    let x = offset;
    let y = offset;
    let w = width - offset * 2;
    let minW = w / 2;
    // ---
    stroke(0, 0, 30, 100);
    context.shadowColor = color(0, 0, 0, 20);
    context.shadowBlur = offset / 3;
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
  rotate(int(random(4)) * 360 / 4);

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
    setConicGradient(0, 0, 0, shuffle(palette.concat()));
    arc(0, 0, w, h, startAngle + i * angleStep, startAngle + (i + 1) * angleStep, type);
  }
  pop();
}

function setConicGradient(angle, x, y, palette) {
  let colors = shuffle(palette.concat());
  let gradient = drawingContext.createConicGradient(angle, x, y);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.8, colors[1]);
  drawingContext.fillStyle = gradient;
}

canvasSketch(sketch, settings);
