import { XMLHttpRequest } from "xmlhttprequest";

export default () => {
  let request = new XMLHttpRequest();

  const query = "json.htm?type=graph&sensor=counter&idx=7&range=week"
  const url = `${process.env.DOMOTICZ_HOST}/${query}`;

  request.open("GET", url, false);
  request.send(null);
  return JSON.parse(request.responseText).result;
};
