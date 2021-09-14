/*
 * Agents
 */

const canvasSketch = require('canvas-sketch');
const rnd = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = ({ width, height }) => {
  // init objects
  const agents = [];
  for (let i = 0; i < 40; i++) {
    const x = rnd.range(0, width);
    const y = rnd.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context }) => {
    // bg
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // draw objects
    agents.forEach(agent => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

// --- Classes ---

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  }
}
