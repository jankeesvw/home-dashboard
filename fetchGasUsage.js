import { XMLHttpRequest } from "xmlhttprequest";

export default () => {
  let request = new XMLHttpRequest();

  const query =
    "SELECT%20difference(distinct(%22value%22))%20FROM%20%22Gas-usage%22%20WHERE%20time%20%3E%20now()%20-%208d%20GROUP%20BY%20time(1d)&epoch=ms";

  const url = `${process.env.GRAFANA_HOST}/query?${
    process.env.DATASOURCE_CREDENTIALS
  }&q=${query}`;

  request.open("GET", url, false);
  request.setRequestHeader(
    "Authorization",
    process.env.AUTHORIZATION_API_TOKEN
  );
  request.send(null);
  return JSON.parse(request.responseText).results[0].series[0];
};
