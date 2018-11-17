import { XMLHttpRequest } from "xmlhttprequest";
import { _ } from "lodash";

const fetchTemperatures = () => {
  let request = new XMLHttpRequest();

  const query =
    "SELECT%20last(%22temperature%22)%20AS%20%22temperature%22%2C%20last(%22temperature_setpoint%22)%20AS%20%22setpoint%22%20FROM%20%22Thermostat%22%20WHERE%20time%20%3E%20now()%20-%2015m%20GROUP%20BY%20%22name%22&epoch=ms";

  const url = `${process.env.GRAFANA_HOST}/query?${
    process.env.DATASOURCE_CREDENTIALS
  }&q=${query}`;

  request.open("GET", url, false);
  request.setRequestHeader(
    "Authorization",
    process.env.AUTHORIZATION_API_TOKEN
  );
  request.send(null);

  const response = JSON.parse(request.responseText).results[0].series;

  return _.map(response, el => {
    return new Thermostat(el);
  });
};

class Thermostat {
  constructor(data) {
    this.name = data.tags.name;
    this.setpoint = data.values[0][2];
    this.temperature = data.values[0][1];
  }
}

export { Thermostat, fetchTemperatures as default };
