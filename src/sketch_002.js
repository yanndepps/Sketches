/*
 * Grid of Arcs
 */

const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const p5 = require('p5');
new p5();

const seed = '619860';
// const seed = Random.getRandomSeed();
Random.setSeed(seed);
console.log('seed -> ', seed);

const settings = {
  p5: true,
  suffix: Random.getRandomSeed(seed),
  dimensions: [512, 512],
  context: '2d',
  animate: true,
  fps: 30,
  duration: 8,
  loop: false
};

const colorCount = Random.rangeFloor(2, 6);
const palette = Random.shuffle(Random.pick(palettes).slice(0, colorCount));
const bg = palette.shift();
const fillColor = Random.pick(palette);

const rndpos = Random.rangeFloor(1, 16);
// console.log(rndpos);

const sketch = ({ width, height }) => {
  // const dim = Math.min(width, height);
  // const sz = dim * 0.084;
  // console.log(sz*2);

  Random.setSeed(seed);
  fill(fillColor);
  noStroke();

  return ({ playhead }) => {
    background(bg);

    const tilesX = 4;
    const tilesY = tilesX;
    const tileW = width / tilesX;
    const tileH = height / tilesY;

    for (let x = 0; x < tilesX; x++) {
      for (let y = 0; y < tilesY; y++) {
        const posX = tileW * x;
        const posY = tileH * y;

        let wave = sin(Math.PI * (playhead * 0.125) + x * rndpos + y * 3);
        // let wave = cos(radians(frameCount + x * 10 + y * 10));
        let mappedWave = map(wave, -1, 1, 0, 5);
        const selector = floor(mappedWave);
        // console.log(selector);

        push();
        translate(posX, posY);
        if (selector === 0) {
          arc(0, 0, tileW * 2, tileH * 2, radians(0), radians(90));
        } else if (selector === 1) {
          arc(tileW, 0, tileW * 2, tileH * 2, radians(90), radians(180));
        } else if (selector === 2) {
          arc(tileW, tileH, tileW * 2, tileH * 2, radians(180), radians(270));
        } else if (selector === 3) {
          arc(0, tileH, tileW * 2, tileH * 2, radians(270), radians(360));
        } else {
          rect(0, 0, tileW, tileH);
        }
        pop();
      }
    }
  };
};

canvasSketch(sketch, settings);
