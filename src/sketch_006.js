/*
 * Agents
 */

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // bg
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // ---
    const pointA = new Point(800, 400, 10);
    const pointB = new Point(400, 800, 30);

    // A
    context.beginPath();
    context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    // B
    context.beginPath();
    context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  };
};

canvasSketch(sketch, settings);

// --- Classes ---

class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}
