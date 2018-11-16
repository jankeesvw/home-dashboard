import { createWriteStream } from "fs";
import { createCanvas } from "canvas";

const canvas = createCanvas(400, 200);
const ctx = canvas.getContext("2d");

const message = "Dashboard test1!";

ctx.font = "30px Impact";
ctx.rotate(0.1);
ctx.fillText(message, 50, 100);

let text = ctx.measureText(message);
ctx.strokeStyle = "rgba(255,255,0,1)";
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + text.width, 102);
ctx.stroke();

const out = createWriteStream("dashboard.png"),
  stream = canvas.createPNGStream();

stream.on("data", function(chunk) {
  out.write(chunk);
});
