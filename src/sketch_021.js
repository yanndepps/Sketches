/*
 * Glitch recoded
 * © sableraph
 * https://www.twitch.tv/sableraph
 * 1.25.58
 */

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [1024, 1024],
  animate: true,
  fps: 10,
  playbackRate: 'throttle',
  // duration: 30,
  context: 'webgl',
  attributes: {
    antialias: true
  }
};

let pg;

const sketch = ({ width, height }) => {
  colorMode(HSB);
  background(33);
  // pg = createGraphics(width, height);
  // translate(-width / 2, -height / 2);

  // draw
  return ({ playhead, time, frame }) => {
    //---
    let t = time * 0.6;
    // let t = tan(time * 0.2);
    // const t = Math.tan(playhead * Math.PI * 0.8);
    let w = width;
    let h = height;
    let hueAngle = 360 / 4 * floor(random(4));
    let c = color(hueAngle, 60, 90);
    //---
    rotateX(t);
    rotateY(t);
    rotateZ(t);
    scale(nSin(frame * 0.65));
    //---
    fill(c);
    box(w * 0.45, h * 0.45);
  };
};

function nSin(a) {
  return map(sin(a), -1, 1, 0, 1);
}

canvasSketch(sketch, settings);
