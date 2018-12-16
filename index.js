import dotenv from "dotenv";

import { createWriteStream } from "fs";
import { _ } from "lodash";
import { createCanvas } from "canvas";
import fetchGasUsage from "./fetchGasUsage";
import fetchTemperatures from "./fetchTemperatures";
import "isomorphic-fetch";

dotenv.config();

const gasUsage = fetchGasUsage();
const temperatures = fetchTemperatures();

const canvas = createCanvas(384, 640);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 384, 640);

ctx.fillStyle = "black";

_.forEach(gasUsage.values, (data, i) => {
  const height = data[1] * 2;
  ctx.fillRect(i * 45 + 30, 50, 10, -height);
});

ctx.font = '19px Courier';

_.forEach(temperatures, (thermostat, i) => {
  ctx.fillText(thermostat.name, 10, i * 20 + 150);
  ctx.fillText(thermostat.setpoint, 110, i * 20 + 150);
  ctx.fillText(thermostat.temperature, 150, i * 20 + 150);
});

const out = createWriteStream("dashboard.png"),
  stream = canvas.createPNGStream();

stream.on("data", function(chunk) {
  out.write(chunk);
});
