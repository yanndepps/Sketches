/*
 * Grid of Arcs
 */

const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [ 600, 600 ],
  context: '2d',
  animate: true,
  // duration: 2,
  // loop: true
};

const colorCount = Random.rangeFloor(2, 6);
const palette = Random.shuffle(Random.pick(palettes).slice(0, colorCount));
const bg = palette.shift();
const fillColor = Random.pick(palette);

const sketch = ({ width, height }) => {
  const dim = Math.min(width, height);
  const sz = dim * 0.084;
  // console.log(sz*2);

  fill(fillColor);
  noStroke();

  return ({ time }) => {
    background(bg);

    const tilesX = 4;
    const tilesY = tilesX;
    const tileW = width / tilesX;
    const tileH = height / tilesY;

    for (let x = 0; x < tilesX; x++) {
      for (let y = 0; y < tilesY; y++) {
        const posX = tileW * x;
        const posY = tileH * y;

        let wave = sin(Math.PI * ( time * 0.25 ) + x * 5 + y * 3);
        // let wave = cos(radians(frameCount + x * 10 + y * 10));
        let mappedWave = map(wave, -1, 1, 0, 5);
        const selector = floor(mappedWave);
        // console.log(selector);

        push();
        translate(posX, posY);
        if (selector === 0) {
          arc(0, 0, tileW*2, tileH*2, radians(0), radians(90));
        } else if (selector === 1) {
          arc(tileW, 0, tileW*2, tileH*2, radians(90), radians(180));
        } else if (selector === 2) {
          arc(tileW, tileH, tileW*2, tileH*2, radians(180), radians(270));
        } else if (selector === 3) {
          arc(0, tileH, tileW*2, tileH*2, radians(270), radians(360));
        } else {
          rect(0, 0, tileW, tileH);
        }
        pop();
      }
    }
  };
};

canvasSketch(sketch, settings);
