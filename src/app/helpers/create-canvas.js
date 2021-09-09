export default function createCanvas(id) {
  const newCanvas = document.createElement("canvas");
  newCanvas.id = id;
  document.body.appendChild(newCanvas);

  return newCanvas;
}
