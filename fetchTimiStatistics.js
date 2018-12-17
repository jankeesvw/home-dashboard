import { XMLHttpRequest } from "xmlhttprequest";
import { _ } from "lodash";

const fetchTimiStatistics = () => {
  let request = new XMLHttpRequest();

  const url = process.env.TIMI_DATA_URL;

  request.open("GET", url, false);
  request.setRequestHeader(
    "Authorization",
    process.env.AUTHORIZATION_API_TOKEN
  );
  request.send(null);

  const stats = request.responseText.split(",");
  return [
    `${stats[0]} klanten`,
    `${stats[1]} uren`,
    `€ ${stats[2]} laatste 30 dagen`,
    `${stats[3]} in trail`
  ].join("\n");
};

export { fetchTimiStatistics as default };
