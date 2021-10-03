/*
 * Type
 */

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

let manager;

let text = 'A';
let fontSize = 800;
let fontFamily = 'serif';

const sketch = () => {
  // load fonts using browser's "FontFace" API to load fonts from javascript
  // this ensures the font is renderable before first drawing to the canvas
  const fontUrl = '../assets/sketch_008/font/bauhaus.otf';
  const myFont = new window.FontFace(
    'bauhaus',
    `url(${fontUrl})`
  );
  myFont.load();
  document.fonts.add(myFont);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    context.fillStyle = 'black';
    context.font = `${fontSize}px "bauhaus"`;
    context.textBaseline = 'top';
    // context.textAlign = 'center';

    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    // bounding box
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

const onKeyUp = (e) => {
  // console.log(e);
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

// about async functions
/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};

// const start = () => {
//   loadMeSomeImage(url).then(img => {
//     console.log('image width', img.width);
//   });
//   console.log('this line');
// };

start();
*/
