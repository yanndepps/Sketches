/*
 * Agents -> svg export
 */

const canvasSketch = require('canvas-sketch');
const rnd = require('canvas-sketch-util/random');
const mth = require('canvas-sketch-util/math');
const svg = require('./canvas-to-svg.js')

const settings = {
  dimensions: [1080, 1080],
  animate: false,
  time: 1.5,
  // fps: 24,
  // duration: 4,
  scaleToView: true,
  pixelsPerInch: 300
};

const sketch = () => {
  return svg(props => {
    const { context, width, height } = props;

    // init objects
    const agents = [];
    const numAgents = 12;
    for (let i = 0; i < numAgents; i++) {
      // const x = rnd.range(0, width);
      const x = width / 2 + rnd.range(-250, 250);
      // const y = rnd.range(0, height);
      const y = height / 2 + rnd.range(-250, 250);
      agents.push(new Agent(x, y));
    }

    // consistant sizing regardless of portrait/landscape modes
    const dim = Math.min(width, height);
    const ns = Math.floor(dim * 0.0016);
    // console.log('sizing ->', ns)
    // bg
    context.fillStyle = 'white';
    // context.fillStyle = 'black';
    // context.strokeStyle = 'white';
    context.fillRect(0, 0, width, height);
    // draw objects
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        // distance
        const dist = agent.pos.getDistance(other.pos);

        // lines
        if (dist > 200) continue;
        // lines width based on distance
        context.lineWidth = mth.mapRange(dist, 0, 200, ns * 12, ns * 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }
    //
    agents.forEach(agent => {
      agent.update();
      agent.draw(context, ns);
      agent.bounce(width, height);
    });
  });
};

canvasSketch(sketch, settings);

// --- Classes ---

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
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
