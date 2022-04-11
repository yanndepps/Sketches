/*
 * flow-fields
 * recoded from : Noise in Creative Coding
 * by Varun Vachhar
 * https://varun.ca/noise/
 */

const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const { mapRange } = require('canvas-sketch-util/math');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const palettes = require('nice-color-palettes');

const scale = 1;
const debug = false;
const trace = true;

const seed = 'flow_fields_041222';
Random.setSeed(seed);

const settings = {
  suffix: Random.getSeed(seed),
  dimensions: [595 * scale, 842 * scale], // 600x600
  scaleToView: false,
  animate: true,
  duration: 12,
  loop: false,
  playbackRate: 'throttle',
  fps: 24
};

const FREQUENCY = 0.001 / scale;
const AMPLITUDE = 5;

const PARTICLE_COUNT = debug ? 100 : 999;
const DAMPING = 0.1;

const STEP = 5 * scale;
const PARTICLE_STEPS = 30 * scale;

const sketch = () => {
  // more color choices and randomness
  const colorCount = Random.rangeFloor(2, 6);
  const palette = Random.shuffle(Random.pick(palettes))
    .slice(0, colorCount);

  // const seed = 'depps_flow_fields';
  // Random.setSeed(seed);

  let particles = [];
  let STEPS_TAKEN = 0;

  return {
    begin({ width, height }) {
      STEPS_TAKEN = 0;
      particles = [];

      // generate some particles with a random position
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Random.range(0, width),
          y: Random.range(0, height),
          vx: 0,
          vy: 0,
          line: [],
          color: debug
            ? '#da3900'
            // : Random.pick(['#fcfaf1', '#aaa', '#cacaca', '#e6b31e']),
            : Random.pick(palette),
        });
      }
    },
    render({ context, width, height, playhead }) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#343434';
      context.fillRect(0, 0, width, height);

      const margin = 0.03 * width;
      const clipBox = [
        [margin, margin],
        [width - margin, height - margin],
      ];

      if (debug) {
        drawVectorField(context, width, height);
      }

      STEPS_TAKEN = Math.floor(mapRange(playhead, 0, 1, 0, PARTICLE_STEPS));

      if (particles[0].line.length < PARTICLE_STEPS) {
        particles.forEach((particle) => {
          moveParticle(particle);
        });
      }

      const lines = particles.map((particle) => particle.line);

      const clippedLines = clipPolylinesToBox(lines, clipBox, false, false);

      context.lineWidth = 2; // 4
      context.lineJoin = 'round';
      context.lineCap = 'round';

      if (trace) {
        clippedLines.forEach((line, index) => {
          const [start, ...pts] = line;

          context.beginPath();
          context.moveTo(...start);
          pts.forEach((pt) => {
            context.lineTo(...pt);
          });

          context.strokeStyle = particles[index].color;
          context.stroke();
        });
      } else {
        clippedLines.forEach((line, index) => {
          const tail = line[line.length - 1];
          context.fillStyle = particles[index].color;
          context.beginPath();
          context.arc(...tail, 5, 0, 2 * Math.PI);
          context.fill();
        });
      }
    },
  };
};

canvasSketch(sketch, settings);

function moveParticle(particle) {
  // calculate direction from noise
  const angle = Random.noise2D(particle.x, particle.y, FREQUENCY, AMPLITUDE);

  // update the velocity of the particle
  // based on direction
  particle.vx += Math.cos(angle) * STEP;
  particle.vy += Math.sin(angle) * STEP;

  // move the particle
  particle.x += particle.vx;
  particle.y += particle.vy;

  // use damping to slow down the particle ( friction )
  particle.vx *= DAMPING;
  particle.vy *= DAMPING;

  particle.line.push([particle.x, particle.y]);
}

function drawVectorField(context, width, height) {
  const length = 20;
  const thickness = 4;
  const padding = 0; // 0.1 * height

  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 32; y++) {
      context.save();
      context.fillStyle = 'rgba(255, 255, 255, 0.5)';

      const t = {
        x: mapRange(x, 0, 31, padding, width - padding),
        y: mapRange(y, 0, 31, padding, height - padding),
      };

      const angle = Random.noise2D(t.x, t.y, FREQUENCY, AMPLITUDE);

      // rotate in place
      context.translate(t.x, t.y);
      context.rotate(angle);
      context.translate(-t.x, -t.y);

      // draw the line
      context.fillRect(
        t.x - length / 2,
        t.y - thickness / 2,
        length,
        thickness
      );
      context.restore();
    }
  }
}
