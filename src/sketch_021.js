/*
 * Glitch 01
 * recoded
 * © sableraph
 * https://www.twitch.tv/sableraph
 * 2.25.11
 */

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  p5: true,
  dimensions: [1024, 1024],
  animate: true,
  fps: 20,
  playbackRate: 'throttle',
  // duration: 30,
  // context: 'webgl',
  attributes: {
    antialias: true
  }
};

let pg;

const sketch = ({ width, height }) => {
  colorMode(HSB);
  background(0);
  pg = createGraphics(width, height, WEBGL);
  // translate(-width / 2, -height / 2);

  // draw
  return ({ playhead, time, frame }) => {
    //---
    let t = time * 0.6;
    // let t = tan(time * 0.2);
    // const t = Math.tan(playhead * Math.PI * 0.8);
    let w = width;
    let h = height;
    //---
    // if (frameCount % 45 === 0) {
    //   background(0)
    //   pg.background(0)
    // };

    if (frameCount % 45 > 135) {
      return;
    };

    //---
    fill(0, 0.001);
    rect(0, 0, w, h);
    let colorCount = 4;
    // let hueAngle = ((360 / colorCount) + t) % 360 * floor(random(colorCount));
    let hueAngle = ((360 / colorCount) + t) % 360 * floor(random(colorCount));
    // let c = color(hueAngle, 100, 90);
    // let c = color(random(150, 300), 100, 100);
    let sh = nSin(t) * 360;
    let c = color(random(sh - 100, sh), 100, 100);
    //---
    pg.push();
    pg.noStroke();
    pg.rotateX(t * noise(t));
    pg.rotateY(t);
    pg.rotateZ(t);
    // pg.scale(nSin(frame * 0.65));
    pg.scale(nSin(t * 10));
    //---
    pg.fill(c);
    pg.box(w * 0.65, h * 0.65);
    pg.pop();
    //---
    // let bm = random() < 0.1 ? ADD : DIFFERENCE
    let bm = DIFFERENCE;

    push();
    imageMode(CENTER);
    translate(noise(t * 10) * w - w / 2, noise(t * 10 + 5493827508) * h - h / 2);
    translate(w / 2, h / 2);
    scale(nSin(t));
    rotate(t);
    blendMode(bm);
    image(pg, 0, 0, w * nSin(t * 2), h);
    pop();

    let angle_rot = 0;
    push();
    for (let x = 0; x < w; x += 0.5) {
      translate(x, 0);
      if (x % 10 === 0) angle_rot += 180;
      strokeWeight((w * 0.06) * noise(t));
      // strokeWeight(1);
      // stroke(random(0, 100), 100, 30);
      line(0, 0, 0, h);
      // angle_rot += 1;
    }
    pop();


    // let sx = 0;
    // let sy = 0;
    // let sw = nSin(t * 10) % 1;
    // let sh = h;
    // let dx = t % 1 * w;
    // let dy = 0;
    // let dw = w * 0.2;
    // let dh = h;
    // pg.copy(sx, sy, sw, sh, dx, dy, dw, dh);
  };
};

function nSin(a) {
  return map(sin(a), -1, 1, 0, 1);
}

canvasSketch(sketch, settings);
