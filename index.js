import dotenv from "dotenv";

import { createWriteStream } from "fs";
import { createCanvas } from "canvas";
import fetchGasUsage from "./fetchGasUsage"
import "isomorphic-fetch";

dotenv.config();

const gasUsage = fetchGasUsage();

const canvas = createCanvas(384, 640);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 384, 640);

ctx.fillStyle = "black";

gasUsage.values.forEach((data, i) => {
  const height = data[1] * 2;
  ctx.fillRect((i * 45) + 30, 50, 10, -height);
});

const out = createWriteStream("dashboard.png"),
  stream = canvas.createPNGStream();

stream.on("data", function(chunk) {
  out.write(chunk);
});
