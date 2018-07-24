
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

### How it works

All [teravoz events](https://developers.teravoz.com.br/#lista-eventos) are received via POST /webhook and eventually handle by [TeravozEventHandlerService](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api/src/services/TeravozEventHandlerService).
This Service uses [redux + redux logic](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md#redux--redux-logic) to state and control state changes in a deterministic way.

The application state has the following shape:

```json
{
	"returningCustomers": {},
	"ongoingCalls": {
		"212ac5b5-b8d2-4fc4-ae00-ef76bce6f90e": {
			"teravozType": "call.ongoing",
			"callId": "212ac5b5-b8d2-4fc4-ae00-ef76bce6f90e",
			"code": "35556-2328",
			"direction": "inbound",
			"ourNumber": "(329) 001-9775 x45159",
			"theirNumber": "+551199999999",
			"timestamp": "2018-07-24T13:00:47.349Z"
		}
	}
}
```

With this data structure it's really easy to delegate calls:

  1. When receives `call.ongoing` event we add to `state.ongoingCalls`. This is done [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/reducer.js#L28) and tested [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/reducer.test.js#L93)
  2. When receives `call.finished` event we add the phone number to `state.returningCustomers`. This is done [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/reducer.js#L16) and tested [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/reducer.test.js#L104)
  3. When receives `call.standby` event we delegate calls to 900 or 901. This is done [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.js#L10) and tested [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/logic/call-delegation-logic.test.js#L58)

The state is persistent and store as a json file. This is done [here](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/api/src/services/TeravozEventHandlerService/TeravozEventHandlerService.js#L31).

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

