/*
 * Live Coding Session 019
 * Noise & Gradient
 * © shunsuke takawo
 * Recoded & Edited
 * color variations
 */

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json');
const rnd = require('canvas-sketch-util/random');
const p5 = require('p5');
new p5();

// const seed = '647423';
// 647423
const seed = rnd.getRandomSeed();
rnd.setSeed(seed);
console.log('seed -> ', seed);

let nColor = rnd.rangeFloor(4, 5);
console.log('num colors -> ', nColor);
let palette = rnd.shuffle(rnd.pick(palettes)).slice(0, nColor);
const setOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;
const col_0 = setOpacity(palette[0], 0.01);
const col_1 = setOpacity(palette[1], 0.9);
const col_2 = setOpacity(palette[2], 0.9);
const col_3 = setOpacity(palette[3], 0.9);

// console.log('hex color_0 -> ', col_0);
// console.log('hex color_1 -> ', col_1);
// console.log('hex color_2 -> ', col_2);
// console.log('hex color_3 -> ', col_3);

const settings = {
  p5: true,
  suffix: rnd.getSeed(seed),
  // dimensions: [595, 595],
  dimensions: [2480, 2480],
  context: '2d',
  animate: true
};

let yOffset = 0.0;

const sketch = ({ width, height }) => {
  // consistant sizing regardless of portrait/landscape modes
  const dim = Math.min(width, height);
  const ns = Math.floor(dim * 0.0008);
  console.log('sizing ->', ns)

  // randomSeed(seed);
  rnd.getSeed(seed);
  colorMode(HSB, 360, 100, 100, 10);
  angleMode(DEGREES);
  smooth();
  background(col_0);
  // ---
  return ({ context }) => {
    let offset = width / 20;
    rect(offset, offset, width - offset * 2, height - offset * 2);
    context.clip();
    // ---
    stroke(0, 0, 0);
    const str = ns * 0.02
    strokeWeight(str);
    noFill();

    let d = width / 70;
    let xOffset = 0.0;

    for (let i = 0; i < 10; i++) {
      // background(0, 0, 90, 100);
      background(col_0);
      for (let x = -d / 2; x < width + d / 2; x += d / 2) {
        let n2 = noise(xOffset, yOffset);
        let n1 = noise(xOffset, yOffset - height / 2);
        let n3 = noise(xOffset, yOffset + height / 2);

        let y2 = map(n2, 0, 1, 0, height);
        let y1 = map(n1, 0, 1, -height / 4, height / 2);
        let y3 = map(n3, 0, 1, height / 2, height * 3 / 2);

        // noiseWave(x, y2, color(random(200, 240), 80, 100), random(10));
        // noiseWave(x, y1, color(random(200, 320), 80, 100), random(10));
        // noiseWave(x, y3, color(random(240, 360), 80, 100), random(10));

        noiseWave(x, y2, color(col_2), random(10));
        noiseWave(x, y1, color(col_1), random(10));
        noiseWave(x, y3, color(col_3), random(10));

        xOffset += 1 / 100;
      }
      yOffset += 1 / 100;
    }
    fill(0, 0, 100, 0.15);
    circle(width / 2, height / 2, ns * (width * 0.5));
    // ---
    for (let i = 0; i < 10000; i++) {
      let angle = random(360);
      let r = ((1 - random(random(random(random())))) * (ns * (width * 0.4))) / 2;
      let x = width / 2 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      stroke(0, 0, 0, 3);
      strokeWeight(ns);
      point(x, y);
    }
  };
};

function noiseWave(x, y, col, count = 10) {
  for (let i = 0; i < count; i++) {
    push();
    translate(x, y);
    stroke(col);
    ellipse(0, 0, i * 50);
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
