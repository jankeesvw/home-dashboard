import dotenv from "dotenv";

import { createWriteStream } from "fs";
import { _ } from "lodash";
import { createCanvas } from "canvas";
import fetchGasUsage from "./fetchGasUsage";
import fetchTemperatures from "./fetchTemperatures";
import fetchTimiStatistics from "./fetchTimiStatistics";
import "isomorphic-fetch";
import im from "imagemagick";

dotenv.config();

const gasUsage = fetchGasUsage();
const temperatures = fetchTemperatures();
const timi = fetchTimiStatistics();

const canvas = createCanvas(640, 384);
const ctx = canvas.getContext("2d");
ctx.antialias = 'none';
ctx.font = "19px Arial";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 640, 384);

ctx.fillStyle = "black";

_.forEach(gasUsage.values, (data, i) => {
  const value = data[1];
  const height = value * 2;
  const x = i * 65 + 10;
  const y = 75;
  const width = 63;
  ctx.fillRect(x, y, width, -height);
  ctx.fillText(`${parseInt(value)}m³\n€${parseInt(value * 0.67)}`, x, y + 20);
});

ctx.fillStyle = "black";

const date = new Date();
ctx.fillText(`${date.getHours()}:${date.getMinutes()}`, 10, 20);

_.forEach(temperatures, (thermostat, i) => {
  const space = 25;
  ctx.fillText(thermostat.name, 10, i * space + 150);
  ctx.fillText(parseInt(thermostat.setpoint), 140, i * space + 150);
  ctx.fillText(parseInt(thermostat.temperature), 200, i * space + 150);
});

ctx.fillText(timi, 300, 150);

const out = createWriteStream(__dirname + "/dashboard.png");
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => {
  im.convert(["dashboard.png", "dashboard.bmp"]);
});
