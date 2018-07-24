[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Teravoz Challenge

This repository solves the [Teravoz's fullstack challenge](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)

Currently deployed to [https://teravoz-challenge-grxovemtdu.now.sh/](https://teravoz-challenge-grxovemtdu.now.sh/)

Read the tasks answers 1, 2, 4 [here](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/tasks-answers.md)

**Task3 requirements and solutions**

So your Node.js application has to do the following:

- Listen to events emitted by Teravoz at /webhook endpoint. Events are and come in the following order: call.new, call.standby, call.waiting, actor.entered, call.ongoing, actor.left, call.finished. Those are life cycle events of a call.

  See
  [Route: /webhook](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/webhook.js), 
  [Test route webhook](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/routes/webhook.test.js)

- When an event of type call.standby arrives, you need to delegate that call based on the given criteria above, by POSTing to Teravoz API's /actions endpoint

  See
  [call-delegate-logic](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.js), 
  [Test: Calls from returning customers are delegated to 901](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.test.js#L30), 
  [Test: Calls from new customers are delegated to 900](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.test.js#L58), 
  [IntegrationTest: Call delegation](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/call-delegation.test.js)

- When app is restarted, it needs to work as if it hasn't at all - returning customers will always be returning customers

  See
  [On state change save to disk](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/TeravozEventHandlerService.js#L31), 
  [On app restart load state from disk](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/TeravozEventHandlerService.js#L24),
  [IntegrationTest: Restart server](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/integration-test/server-restart.test.js)

- [bonus 1] use of Docker containers

  See
  [Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/Dockerfile), 
  [docker-compose](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docker-compose.yml), 
  [apps/api/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/Dockerfile), 
  [apps/dashboard/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/dashboard/Dockerfile), 
  [apps/teravoz-api-fake/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/teravoz-api-fake/Dockerfile)

- [bonus 2] a little dashboard in React or other library, showing current active calls

  [This](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard) is a react application that allows us to simulate calls and see active calls.

- Unfortunately, Teravoz doesn't have a sandbox environment which you could use for interacting with, so you need to mock the required interaction between your application and Teravoz API. For example, you need to simulate POSTs to your /webhook endpoint.

  [This](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-api-fake) application is a fake teravoz API.

### Running Locally

Please install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/);

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

#### Development Requirements

Install the most up-to-date [node](https://nodejs.org/en/download/).

The Dockerfile of all application use node10. See [apps/api/Dockerfile](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/Dockerfile)
The applications rely on async/await synxtax (node8+) and we also use the new [URL builtin](https://nodejs.org/api/url.html);

## Understanding the code

### Repository Overview

This repository contains 3 different applications:

- [apps/dashboard](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard): A little dashboard in React, showing current active calls.
- [apps/api](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api): Exposes current active calls via http and handle teravoz event by exposing a /webhook endpoint.
- [apps/teravoz-api-fake](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-fake-api): A http service that mimics the teravoz api and provides simulation goodies.

Each application is a docker container and meant to be deployed separatedly. For instance using [now](https://zeit.co/now).

This is a monorepo made using [lerna](https://github.com/lerna/lerna) to manage multiple packages.
Also I'm not using yarn because of some lerna [issues](https://github.com/lerna/lerna/issues/1349).

Even though there's no shared packages for this trivial application, the monorepo structure is convenient to use a single linting and formatting set of rules.

We use [eslint](https://eslint.org/) + [prettier](https://github.com/prettier/prettier) to quite the good pretty. Take a look at [.prettierrc](https://github.com/felipeblassioli/teravoz-challenge/blob/master/.prettierrc) and [.eslintrc.json](https://github.com/felipeblassioli/teravoz-challenge/blob/master/.eslintrc.json) for details.

### Guided Tour 

0.  Read the [challenge specification](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md)
1.  Read the [docker-compose](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docker-compose.yml) to see how apps interact with each other.
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
7.  Read apps/dashboard [README](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard) in particular [Architecture Decisions](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/dashboard#architecture-decisions)
