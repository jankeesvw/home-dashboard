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

ctx.font = "19px Courier";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 640, 384);

ctx.fillStyle = "black";

_.forEach(gasUsage.values, (data, i) => {
  const height = data[1] * 2;
  ctx.fillRect(i * 45 + 30, 90, 30, -height);
});

ctx.fillStyle = "black";

ctx.fillText(new Date().toString(), 10, 20);

_.forEach(temperatures, (thermostat, i) => {
  const space = 25;
  ctx.fillText(thermostat.name, 10, i * space + 150);
  ctx.fillText(thermostat.setpoint, 140, i * space + 150);
  ctx.fillText(thermostat.temperature, 200, i * space + 150);
});

ctx.fillText(timi, 300, 150);

const out = createWriteStream(__dirname + "/dashboard.png");
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => {
  im.convert(["dashboard.png", "dashboard.bmp"]);
});
