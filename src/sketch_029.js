/*
 * Live Coding Session 015
 * © shunsuke takawo
 * Recoded
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
const p5 = require('p5');
new p5();

const seed = 'takawo_015_050122_l';
rnd.setSeed(seed);

let nColor = rnd.rangeFloor(2, 7);
let palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);

const settings = {
  p5: true,
  suffix: rnd.getSeed(seed),
  dimensions: [1024, 1024],
  context: '2d',
  animate: false
};

let myShapes = [];
let shapeNum = 50;

const sketch = ({ width, height }) => {
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  // ---
  for (let i = 0; i < palette.length; i++) {
    let col = color(palette[i]);
    col.setAlpha(30);
    palette[i] = col;
  }
  // ---
  for (let i = 0; i < shapeNum; i++) {
    let rMax = sqrt(sq(width) + sq(height));
    let d = random(50, rMax / 3) * 1.5;
    let angle = random(360);
    let r = random(rMax / 2 - d);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    let detail = 50;
    let col = random(palette);
    let myShape = new MyShape(x, y, d / 2, detail, col);
    myShapes.push(myShape);
  }
  // ---
  return ({ width, context }) => {
    // ---
    background(palette[0]);
    // background(0, 0, 90);
    clear();
    blendMode(BURN);
    // ---
    for (let i = 0; i < myShapes.length; i++) {
      let shape = myShapes[i];
      shape.display();
      for (let j = i + 1; j < myShapes.length; j++) {
        let pointsA = myShapes[i].points;
        let pointsB = myShapes[j].points;

        for (let p of pointsA) {
          for (let q of pointsB) {
            let d = p5.Vector.dist(p, q);
            if (d < width / 20) {
              let gradient = context.createLinearGradient(p.x, p.y, q.x, q.y);
              gradient.addColorStop(0, myShapes[i].col);
              gradient.addColorStop(1, myShapes[j].col);
              context.strokeStyle = gradient;
              strokeWeight(0.5);
              line(p.x, p.y, q.x, q.y);
            }
          }
        }
      }
    }
    let g = get();
    clear();
    blendMode(BLEND);
    // background(0, 0, 90);
    background(palette[0]);
    context.shadowColor = color(0, 0, 0, 33);
    context.shadowBlur = width / 15;
    image(g, 0, 0);
  };
};

class MyShape {
  constructor(x, y, r, detail, col) {
    let startAngle = random(360);
    this.center = createVector(x, y);
    this.r = r;
    this.points = [];
    for (let angle = startAngle; angle < startAngle + 360; angle += 360 / detail) {
      this.points.push(createVector(this.center.x + cos(angle) * r, this.center.y + sin(angle) * r));
    }
    this.col = col;
  }
  display() {
    noFill();
    stroke(this.col);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    strokeWeight(3);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      point(p.x, p.y);
    }
  }
}

canvasSketch(sketch, settings);
