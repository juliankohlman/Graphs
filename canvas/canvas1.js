console.log('hooked up to the canvas');

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c for context
let c = canvas.getContext('2d');

c.fillStyle = '#F99157';
c.fillRect(300, 30, 100, 100);
c.fillStyle = '#66CCCC';
c.fillRect(500, 210, 100, 100);
c.fillStyle = '#F2777A';
c.fillRect(270, 400, 100, 100);
c.fillStyle = '#FFCC66';
c.fillRect(50, 50, 100, 100);
c.fillStyle = '#99CC99';
c.fillRect(600, 530, 100, 100);
console.log(canvas);

const colors = [
  '#F99157',
  '#46B29D',
  '#DE5B49',
  '#324D5C',
  '#FFD57E', //
  '#E37B40',
  '#66CCCC',
  '#F2777A',
  '#FFCC66',
  '#99CC99',
];

// Lines
c.beginPath();
c.moveTo(301, 31);
c.lineTo(50, 400);
c.lineTo(50, 50);
c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
c.stroke();

for (let i = 0; i < 20; i += 1) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(50, 400);
  c.lineTo(50, 50);
  c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
  c.stroke();
}


// Arc--Circle
for (let i = 0; i < 25; i += 1) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
  c.stroke();
}

// Rectangles
for (let i = 0; i < 20; i += 1) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  // console.log(x, y);
  c.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  c.fillRect(x, y, 100, 100);
}
