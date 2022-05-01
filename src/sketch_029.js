/*
 * Live Coding Session 015
 * © shunsuke takawo
 * Recoded
 * 22.33
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
const p5 = require('p5');
new p5();

const seed = 'takawo_015_050122_b';
rnd.setSeed(seed);

let nColor = rnd.rangeFloor(2, 6);
let palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);

const settings = {
  p5: true,
  suffix: rnd.getSeed(seed),
  dimensions: [1024, 1024],
  context: '2d',
  animate: false
};

let myShapes = [];
let shapeNum = 15;

const sketch = ({ width, height }) => {
  // colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  // ---
  for (let i = 0; i < shapeNum; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(50, 150);
    let detail = 60;
    let myShape = new MyShape(x, y, r, detail);
    myShapes.push(myShape);
  }
  // ---
  return ({ width, context }) => {
    // ---
    // background(palette[0]);
    // background(0, 0, 90);
    background(34, 41, 40);
    // ---
    // for (let myShape of myShapes) {
    //   myShape.display();
    // }
    //
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
              strokeWeight(0.5);
              line(p.x, p.y, q.x, q.y);
            }
          }
        }
      }
    }
  };
};

class MyShape {
  constructor(x, y, r = 100, detail = 180) {
    this.center = createVector(x, y);
    this.r = r;
    this.points = [];
    for (let angle = 0; angle < 360; angle += 360 / detail) {
      this.points.push(createVector(this.center.x + cos(angle) * r, this.center.y + sin(angle) * r));
    }
  }
  display() {
    noFill();
    // stroke(0, 0, 0);
    stroke(176, 106, 71);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    // strokeWeight(5);
    // for (let i = 0; i < this.points.length; i++) {
    //   let p = this.points[i];
    //   point(p.x, p.y);
    // }
  }
}

canvasSketch(sketch, settings);
