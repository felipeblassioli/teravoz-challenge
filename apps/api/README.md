# API application

## Relevant node packages
The relevant node packages may be somewhat unusual. 

### Redux + Redux logic

Taken from [Redux docs](https://redux.js.org/)

> Redux is a predictable state container for JavaScript apps.
> It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
> I chose Redux to handle the app's state and data-flow.

Perhaps it is somewhat unusual to use redux for a server-side application, but it's not the library that is important, but the paradigm: In a event oriented application determinins is highly desirable and it fits perfectly with nodejs (since it's also event oriented).

For this challenge, redux is convenient because:
  - The business logic is decoupled. The challenge specification required the app to:
    1. Keep track of returning users. This is done at `logic/returning-user-logic.js`
    2. Delegate calls new users to 900 and returning users to 901. This is done at `logic/call-delegation-logic.js`
  - Great logging. One line of code and everything is logged beatifully (thanks [redux logger](https://github.com/evgenyrodionov/redux-logger))
  - Teravoz events are trivially mapped 1:1 to [Redux actions](https://redux.js.org/basics/actions)
  - It's ease to test, because:
    - Injected dependencies are explicit and easily mocked.
    - State changes are deterministic, so we can describe behaviors/scenarios in a declarative way.
  - Since we do not hide the application state, it's really easy to persist it and continue after a restart (or crash).

Also we could drop redux and fit neatly in any micro-service architecture, the logic's are reactive to actions/events, so if we instead
listen for events from a message-bus such as Kafka the business logic wouldn't change much. In fact any file in the `logic` directory can
be seen as a microservice in a distributed system!

### Immutablejs
 
We use Facebook's [immutablejs](https://facebook.github.io/immutable-js/) because it's cheap to check for state changes.
And why we want cheap changes checks? Because we have a heavy IO operation: saving state to disk, so we do that only if something has changed;

### Ava
We use [ava](https://github.com/avajs/ava) instead of mocha because test files are run in parallel as separate processes, giving you even better performance and an isolated environment for each test file. Also having tests run concurrently forces you to write atomic tests, meaning tests don't depend on global state or the state of other tests, which is a great thing!
