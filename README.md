# Home dashboard

My plan is to create a dashboard for my kitchen. This dashboard will contain the following details:

* m² Gas usage (Smart meter via Domoticz)
* KW usage electric (Smart meter via Domoticz)
* Local weather information
* Temperature of rooms (Honeywell Evohome)

# Shopping list

1. Raspberry PI ([Raspberry Pi 3 B+](https://www.floris.cc/shop/en/home/2081-raspberry-pi-3-b.html))
2. E-paper display ([Waveshare 640x384 7.5 Inches E-Ink Display ](https://www.dx.com/p/waveshare-640x384-7-5-inches-e-ink-display-hat-for-raspberry-pi-yellow-black-white-three-color-504868))

# Run the project

# install dependencies
1. install node-canvas dependencies: https://github.com/Automattic/node-canvas#compiling
2. run `yarn`

Create a `.env` file in the root with the credentials, this is the template:

```
GRAFANA_HOST=http://192.168.1.2:8086
AUTHORIZATION_API_TOKEN=xyz
DATASOURCE_CREDENTIALS=xyz
```

After that just run `yarn start` and look for the file `dashboard.png`.
