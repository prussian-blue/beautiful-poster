import "./reset.css";
import "./style.css";
import * as d3 from "d3";

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

var canvas = document.querySelector("canvas");
canvas.setAttribute("width", `${window.innerWidth}px`);
canvas.setAttribute("height", `${window.innerHeight}px`);

var context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height,
  radius = 2.5,
  minDistance = 40,
  maxDistance = 60,
  minDistance2 = minDistance * minDistance,
  maxDistance2 = maxDistance * maxDistance;

var tau = 2 * Math.PI,
  n = 400,
  particles = new Array(n);

for (var i = 0; i < n; ++i) {
  particles[i] = {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0
  };
}

let col = 0;

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

context.font = "200px Georgia";
context.fillStyle = "white";
context.textBaseline = "middle";
context.textAlign = "center";
let words = [
  "Serendipity",
  "Compassion",
  "Cherish",
  "Eternity",
  "Felicity",
  "Love",
  "Quintessential",
  "Nemesis",
  "Tranquility",
  "Elegance"
];
context.fillText(words[randomInt(0, words.length - 1)], width / 2, height / 2);

// context.globalCompositeOperation = globalCompositeOperationModes["source-atop"]
d3.timer(function(elapsed) {
  context.save();

  // context.clearRect(0, 0, width, height);

  context.strokeStyle = `hsla(${(col += 1)}, ${randomInt(0, 100)}%, ${randomInt(20, 60)}%, .023)`;

  if (col > 360) col = 0;

  for (var i = 0; i < n; ++i) {
    var p = particles[i];
    p.x += p.vx;
    if (p.x < -maxDistance) p.x += width + maxDistance * 2;
    else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
    p.y += p.vy;
    if (p.y < -maxDistance) p.y += height + maxDistance * 2;
    else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
    p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx;
    p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy;
    context.beginPath();
    context.arc(p.x, p.y, radius, 0, tau);
    // context.fill();
  }

  for (var i = 0; i < n; ++i) {
    for (var j = i + 1; j < n; ++j) {
      var pi = particles[i],
        pj = particles[j],
        dx = pi.x - pj.x,
        dy = pi.y - pj.y,
        d2 = dx * dx + dy * dy;
      if (d2 < maxDistance2) {
        context.globalAlpha =
          d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
        context.beginPath();
        context.moveTo(pi.x, pi.y);
        context.lineTo(pj.x, pj.y);
        context.stroke();
      }
    }
  }

  context.restore();
});
