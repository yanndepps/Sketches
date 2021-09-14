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
    const agentA = new Agent(800, 400);
    const agentB = new Agent(400, 800);

    agentA.draw(context);
    agentB.draw(context);
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
