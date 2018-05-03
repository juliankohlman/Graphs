function getPixel(imageData, x, y) {
  const w = imageData.width;
  const h = imageData.height;

  if (x < 0 || x >= w || y < 0 || y >= h) {
    return null;
  }

  const position = (w * y + x) * 4;

  return imageData.data.slice(position, position + 4);
}

function setPixel(imageData, x, y, rgba) {
  const index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = rgba[0];
  imageData.data[index + 1] = rgba[1];
  imageData.data[index + 2] = rgba[2];
  imageData.data[index + 3] = rgba[3];
}

function onLoad() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  // manipulating canvas imageData methods below:
  // imageData.width
  // imageData.height
  // imageData.data --> holds RGBA data
  const imageData = ctx.getImageData(0, 0, width, height); // grabbing the entire canvas
  setPixel(imageData, 30, 20, [0x5f, 0x9e, 0xa0, 0xff]);
  setPixel(imageData, 230, 50, [0xbd, 0xb7, 0x6b, 0xff]);
  setPixel(imageData, 70, 100, [0xff, 0x8c, 0x00, 0xff]);
  setPixel(imageData, 70, 75, [0xdc, 0x14, 0x3c, 0xff]);
  ctx.putImageData(imageData, 0, 0);
  console.log(getPixel(imageData, 30, 20));
  console.log(getPixel(imageData, 230, 50));
  console.log(getPixel(imageData, 70, 100));
  console.log(getPixel(imageData, 70, 75));
}

window.addEventListener('load', onLoad);
