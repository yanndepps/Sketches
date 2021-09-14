/*
 * Agents
 */

const canvasSketch = require('canvas-sketch');
const rnd = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true
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
    // consistant sizing regardless of portrait/landscape modes
    const dim = Math.min(width, height);
    const ns = Math.floor(dim * 0.0016);
    // console.log('sizing ->', ns)
    // bg
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // draw objects
    agents.forEach(agent => {
      agent.update();
      agent.draw(context, ns);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

// --- Classes ---

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(rnd.range(-1, 1), rnd.range(-1, 1));
    this.radius = rnd.range(4, 12);
  }

  bounce(width, height) {
    if (this.pos.x <= (0 + this.radius) || this.pos.x >= (width - this.radius)) this.vel.x *= -1;
    if (this.pos.y <= (0 + this.radius) || this.pos.y >= (height - this.radius)) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context, ns) {
    // context.fillStyle = 'black';
    context.lineWidth = ns * 4;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
