## TeravozFakeAPI application 

This is a standard node application, to run it locally:

```bash
$ npm install
$ npm start
```

| Environment variable  | Description   | Example |
| --------------------- | ------------- | -------- | 
| PORT                  | The HTTP port the will listen | 3001 |
| TARGET_WEBHOOK_URL | Simulation webhooks are sent to this url  | http://localhost:3002/webhook |
| SIMULATION_AUTO_START | Should simulation start automatically, i.e when the application is ready? | true | 
| SIMULATION_NEW_CALLS_DELAY | Simulator will send a call.new event respecting this delay | 5000 | 


To do an interactive simulation use [docker-compose to run everything together](https://github.com/felipeblassioli/teravoz-challenge#running).
