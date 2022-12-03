/*
 * Creative Coding 2.0 -> animation, sound, color
 * U5 -> Audio
 * Part I -> play
 */

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  const audio = document.createElement('audio');
  audio.src = '';
  audio.play();

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
