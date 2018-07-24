[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Teravoz Challenge

This repository solves the [Teravoz's fullstack challenge](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)

### Overview

This repository contains 3 different applications:
   - [apps/dashboard](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard): A little dashboard in React, showing current active calls.
   - [apps/api](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api): Exposes current active calls via http and handle teravoz event by exposing a /webhook endpoint.
   - [apps/teravoz-api-fake](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-fake-api): A http service that mimics the teravoz api and provides simulation goodies.

Each application is a docker container and meant to be deployed separatedly. For instance using [now](https://zeit.co/now).

This is a monorepo made using [lerna](https://github.com/lerna/lerna) to manage multiple packages.
Also I'm not using yarn because of some lerna [issues](https://github.com/lerna/lerna/issues/1349).

Even though there's no shared packages for this trivial application, the monorepo structure is convenient to use a single linting and formatting set of rules.

### Running

Please docker [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/);

```bash
$ docker-compose up
```

Expected terminal output
![alt docker-compose](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/docker-compose-up.png)

Open in your browser [http://localhost:5000](http://localhost:5000)
![alt dashboard](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/dashboard.png)

### Getting Started

1. First read the [challenge specification](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)
2. Read the source code of integration tests to get a feel how the api works
    - [call-delegation-test](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/call-delegation.test.js)
    - [server-restart](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/server-restart.test.js)
3. Read the source code for the [call-delegation-logic](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.js)
4. Read the source code for all routes:
    - api: POST [/webhook](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/webhook.js#L18)
    - api: GET [/calls/active](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/calls.js#L7)
    - teravoz: POST [/actions](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/actions.js#L17)
    - teravoz: POST [/simulation/call/new](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L6)
    - teravoz: POST [/simulation/start](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L17)
    - teravoz: POST [/simulation/stop](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L24)
    - teravoz: GET [/simulation/status](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L29)
4. Read the [Notable Packages](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md) section.
5. Read apps/api [README](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/README.md) in particular [Services Model](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api#services-model)

#### Development Requirements

Install the most up-to-date [node](https://nodejs.org/en/download/).

The Dockerfile of all application use node10. See [apps/api/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/Dockerfile)
The applications rely on async/await synxtax (node8+) and we also use the new [URL builtin](https://nodejs.org/api/url.html);

