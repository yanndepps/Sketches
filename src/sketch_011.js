const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
// new (p5);

// const density = " ._▂▃▄abcde▀▀▅▆▇░░▒▓█░";
// const density = " ._▂▃▄▀▀▅▆▇░░▒▓█░";
const density = " ▐░▒▓▔▔▊▋▌▍▎▏";
// const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let kong;

const preload = p5 => {
  kong = p5.loadImage("../assets/sketch_011/img/kong.jpg");
}

const settings = {
  p5: { p5, preload },
  dimensions: [512, 512],
  context: '2d',
  animate: true
};

const sketch = () => {
  return ({ p5, time, width, height }) => {
    p5.background(0);
    // p5.image(kong, 0, 0, width, height);
    // ---
    let w = width / kong.width;
    let h = height / kong.height;
    kong.loadPixels();

    for (let j = 0; j < kong.height; j++) {
      for (let i = 0; i < kong.width; i++) {
        const pixelIndex = (i + j * kong.width) * 4;
        const r = kong.pixels[pixelIndex + 0];
        const g = kong.pixels[pixelIndex + 1];
        const b = kong.pixels[pixelIndex + 2];
        const avg = (r + b + g) / 3;

        p5.noStroke();
        p5.fill(255);
        // p5.square(i * w, j * h, w);
        const len = density.length;
        const charIndex = p5.floor(p5.map(avg, 0, 255, len, 0));

        p5.textSize(w);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
      }
    }
  };
};

canvasSketch(sketch, settings);
