[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Teravoz Challenge

This repository solves the [Teravoz's fullstack challenge](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)

Currently deployed to [https://teravoz-challenge-grxovemtdu.now.sh/](https://teravoz-challenge-grxovemtdu.now.sh/)

Read the tasks answers 1, 2, 4 [here](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/tasks-answers.md)

### Overview

This repository contains 3 different applications:

- [apps/dashboard](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard): A little dashboard in React, showing current active calls.
- [apps/api](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api): Exposes current active calls via http and handle teravoz event by exposing a /webhook endpoint.
- [apps/teravoz-api-fake](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-fake-api): A http service that mimics the teravoz api and provides simulation goodies.

Each application is a docker container and meant to be deployed separatedly. For instance using [now](https://zeit.co/now).

This is a monorepo made using [lerna](https://github.com/lerna/lerna) to manage multiple packages.
Also I'm not using yarn because of some lerna [issues](https://github.com/lerna/lerna/issues/1349).

Even though there's no shared packages for this trivial application, the monorepo structure is convenient to use a single linting and formatting set of rules.

We use [eslint](https://eslint.org/) + [prettier](https://github.com/prettier/prettier) to quite the good pretty. Take a look at [.prettierrc](https://github.com/felipeblassioli/teravoz-challenge/blob/master/.prettierrc) and [.eslintrc.json](https://github.com/felipeblassioli/teravoz-challenge/blob/master/.eslintrc.json) for details.

### Running Locally

Please docker [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/);

```bash
$ docker-compose build
$ docker-compose up
```

Expected terminal output
![alt docker-compose](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/docker-compose-up.png)

Open in your browser [http://localhost:5000](http://localhost:5000)
![alt dashboard](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/dashboard.png)

### Deploying

Install [now-cli](https://zeit.co/docs/features/now-cli)

```bash
$ now --docker --public
```

**How it works**

This [Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/Dockerfile) is special because in a single container we launch all 3 applications, i.e 3 differente node processes. We use [pm2](http://pm2.keymetrics.io/) and this [config](https://github.com/felipeblassioli/teravoz-challenge/blob/master/ecosystem.config.js) to manage all processes.

### Getting Started with the code

1.  First read the [challenge specification](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)
2.  Read the source code of integration tests to get a feel how the api works
    - [call-delegation-test](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/call-delegation.test.js)
    - [server-restart](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/server-restart.test.js)
3.  Read the source code for the [call-delegation-logic](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.js)
4.  Read the source code for all routes:
    - api: POST [/webhook](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/webhook.js#L18)
    - api: GET [/calls/active](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/calls.js#L7)
    - teravoz: POST [/actions](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/actions.js#L17)
    - teravoz: POST [/simulation/call/new](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L6)
    - teravoz: POST [/simulation/start](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L17)
    - teravoz: POST [/simulation/stop](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L24)
    - teravoz: GET [/simulation/status](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/src/routes/simulation.js#L29)
5.  Read the [Notable Packages](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md) section.
6.  Read apps/api [README](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/README.md) in particular [Services Model](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api#services-model)

#### Development Requirements

Install the most up-to-date [node](https://nodejs.org/en/download/).

The Dockerfile of all application use node10. See [apps/api/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/Dockerfile)
The applications rely on async/await synxtax (node8+) and we also use the new [URL builtin](https://nodejs.org/api/url.html);
