
## API application

This is a standard node application, to run it locally:

```bash
$ npm install
$ npm run test
$ npm start
```

| Environment variable  | Description   | Example |
| --------------------- | ------------- | -------- | 
| PORT                  | The HTTP port the will listen | 3002 |
| TERAVOZ_SERVICE_URL   | The urls expected to responde for POST /actions  | http://localhost:3001 |
| SAVED_STATE_FILEPATH  | The path that the application's state is going to be saved. | /tmp/save-state.json |

If everything is correct, then after `npm start` the application is ready to accept [teravoz events](https://developers.teravoz.com.br/#lista-eventos) via POST /webhook

To do a simulation start the [teravoz-fake-api](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-api-fake) application and set `TERAVOZ_SERVICE_URL` variable or use [docker-compose to run everything together](https://github.com/felipeblassioli/teravoz-challenge#running). I recommend the later.

### Architecture Decisions

  - Environment variables in a single place only: The application [entrypoint](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/start-api.js).
  - Avoid generic variable names. Prefer descreptive names, instead of short ones.

**Mixed case file names**

  - Classes (which you instantiate using `new`) are camelCased.
  - Everything else is underscore cased. Prefer verbs/actions and imperative names.

#### Services Model
I define a Service the same Stuart Sierra define a [component](https://github.com/stuartsierra/component):

> (...) a component is a collection of functions or procedures which share some runtime state.

Taken from [Advantages of the Component Model](https://github.com/stuartsierra/component#advantages-of-the-component-model)

> Large applications often consist of many stateful processes which must be started and stopped in a particular order. The component model makes those relationships explicit and declarative, instead of implicit in imperative code.

> Components provide some basic guidance for structuring a (...) application, with boundaries between different parts of a system. Components offer some encapsulation, in the sense of grouping together related entities. Each component receives references only to the things it needs, avoiding unnecessary shared state.

In a nutshell

  - Clear boundaries between differents parts of the system.
  - Explicit dependencies. (Explicit is better than implicit)
  - Avoids unnecessary testing

A consequence of the 3 things above is that it's particularly easy to test.

I call them Services instead of Components, to distinguish them from a React Component.

### File structure

  - [integration-test/](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api/integration-test): Integration test uses real http-server to test call delegations and server restart.
  - [src/routes/](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api/src/routes): Contains all routes
  - [src/services](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api/src/services)
    - [DiskStorageService](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/DiskStorageService.js): Save the application's state as a json file
    - [TeravozService](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozService.js): Communicates via http with the Teravoz (fake) API.
    - [TeravozEventHandlerService](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api/src/services/TeravozEventHandlerService): The core service. It knows how to handle [teravoz events](https://developers.teravoz.com.br/#lista-eventos) and [delegate calls](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.js)

