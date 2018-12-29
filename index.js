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
const gasUsagePerHour = fetchGasUsage("day");
const temperatures = fetchTemperatures();
const timi = fetchTimiStatistics();

const canvas = createCanvas(640, 384);
const ctx = canvas.getContext("2d");
ctx.antialias = "none";
ctx.font = "19px Arial";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 640, 384);

ctx.fillStyle = "black";

_.forEach(gasUsage, (data, i) => {
  const value = data.v;
  const height = value * 2;
  const x = i * 65 + 10;
  const y = 75;
  const width = 65;
  ctx.fillRect(x, y, width, -height);
  ctx.fillText(`${parseInt(value)}m³\n€${parseInt(value * 0.67)}`, x, y + 20);
});

ctx.font = "12px Arial";

const lastDayInHours = _.slice(
  gasUsagePerHour,
  gasUsagePerHour.length - 24,
  gasUsagePerHour.length
);

_.forEach(lastDayInHours, (data, i) => {
  const value = data.v;
  const time = data.d.match(/[0-9]{2}:[0-9]{2}/)[0];
  const height = Math.max(value * 20, 1);
  const width = (65 * 8) / 24;
  const x = i * width + 10;
  let y = 175;
  ctx.fillRect(x, y, width, -height);
  if (i % 2 == 1) {
    y += 40;
  }
  ctx.fillText(`${time}\n${value}`, x, y + 20);
});

ctx.fillStyle = "black";

ctx.font = "19px Arial";

const date = new Date();
ctx.fillText(`${date.getHours()}:${date.getMinutes()}`, 10, 20);

ctx.fillText(timi, 10, 290);

const out = createWriteStream(__dirname + "/dashboard.png");
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => {
  im.convert(["dashboard.png", "dashboard.bmp"]);
});
