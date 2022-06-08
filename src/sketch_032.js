/*
 * Live Coding Session 019
 * Noise & Gradient
 * © shunsuke takawo
 * Recoded & Edited
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
const p5 = require('p5');
new p5();

// const seed = '060822';
const seed = rnd.getRandomSeed();
rnd.setSeed(seed);
// console.log('seed -> ', seed);

let nColor = rnd.rangeFloor(2, 6);
let palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);
const setOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;
const myColor = setOpacity(palette[0], 0.1);
// console.log(myColor);

const settings = {
  p5: true,
  suffix: rnd.getSeed(seed),
  dimensions: [800, 800],
  context: '2d',
  animate: true
};

let yOffset = 0.0;

const sketch = ({ width, height }) => {
  colorMode(HSB, 360, 100, 100, 10);
  angleMode(DEGREES);
  smooth();
  background(0, 0, 90);
  return ({ context }) => {
    let offset = width / 20;
    rect(offset, offset, width - offset * 2, height - offset * 2);
    context.clip();
    // ---
    stroke(0, 0, 0);
    strokeWeight(0.02);
    noFill();

    let d = width / 70;
    let xOffset = 0.0;

    for (let i = 0; i < 10; i++) {
      background(0, 0, 90, 0.01);
      // background(myColor);
      for (let x = -d / 2; x < width + d / 2; x += d / 2) {
        let n2 = noise(xOffset, yOffset);
        let n1 = noise(xOffset, yOffset - height / 2);
        let n3 = noise(xOffset, yOffset + height / 2);

        let y2 = map(n2, 0, 1, 0, height);
        let y1 = map(n1, 0, 1, -height / 4, height / 2);
        let y3 = map(n3, 0, 1, height / 2, height * 3 / 2);

        noiseWave(x, y2, color(random(200, 240), 80, 100), random(10));
        noiseWave(x, y1, color(random(200, 320), 80, 100), random(10));
        noiseWave(x, y3, color(random(240, 360), 80, 100), random(10));

        xOffset += 1 / 100;
      }
      yOffset += 1 / 100;
    }
    fill(0, 0, 100, 0.5);
    circle(width / 2, height / 2, 300);
    // ---
    for (let i = 0; i < 5000; i++) {
      let angle = random(360);
      let r = ((1 - random(random(random(random())))) * 300) / 2;
      let x = width / 2 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      stroke(0, 0, 0, 3);
      strokeWeight(1);
      point(x, y);
    }
  };
};

function noiseWave(x, y, col, count = 10) {
  for (let i = 0; i < count; i++) {
    push();
    translate(x, y);
    stroke(col);
    ellipse(0, 0, i * 10);
    pop();
  }
}

canvasSketch(sketch, settings);

const start = async () => {
  const manager = await canvasSketch(sketch, settings);
  window.addEventListener('click', () => {
    if (manager.props.playing) manager.pause();
    else manager.play();
  });
};

start();
