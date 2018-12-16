import dotenv from "dotenv";

import { createWriteStream } from "fs";
import { _ } from "lodash";
import { createCanvas } from "canvas";
import fetchGasUsage from "./fetchGasUsage";
import fetchTemperatures from "./fetchTemperatures";
import "isomorphic-fetch";
import im from "imagemagick";

dotenv.config();

const gasUsage = fetchGasUsage();
const temperatures = fetchTemperatures();

const canvas = createCanvas(640, 384);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 640, 384);

ctx.fillStyle = "yellow";

_.forEach(gasUsage.values, (data, i) => {
  const height = data[1] * 2;
  ctx.fillRect(i * 45 + 30, 90, 30, -height);
});

ctx.font = "15px Courier";
ctx.fillStyle = "black";

ctx.fillText(new Date().toString(), 10, 20);

_.forEach(temperatures, (thermostat, i) => {
  ctx.fillText(thermostat.name, 10, i * 20 + 150);
  ctx.fillText(thermostat.setpoint, 130, i * 20 + 150);
  ctx.fillText(thermostat.temperature, 200, i * 20 + 150);
});

const out = createWriteStream(__dirname + "/dashboard.jpeg");
const stream = canvas.createJPEGStream();
stream.pipe(out);
out.on("finish", () => {
  im.convert(["dashboard.jpeg", "dashboard.bmp"]);
});
