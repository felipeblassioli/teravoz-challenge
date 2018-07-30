const test = require('ava');
const EventStoreServer = require('../src/server');
const EventStoreClient = require('../src/client');

test('Dispatched events received in FIFO order', async t => {
  const server = new EventStoreServer({ bindAddress: 'tcp://*:5555' });
  server.start();

  const client = new EventStoreClient({ uri: 'tcp://localhost:5555' });
  await client.connect();

  await new Promise(resolve => {
    const expectedEvents = [
      { hello: 'world0' },
      { hello: 'world1' },
      { hello: 'world2' },
    ];
    let receivedEvents = [];
    client.subscribe(evt => {
      receivedEvents.push(evt);
      if (receivedEvents.length === expectedEvents.length) {
        t.deepEqual(receivedEvents, expectedEvents);
        resolve();
      }
    });

    client.dispatch({ hello: 'world0' });
    client.dispatch({ hello: 'world1' });
    client.dispatch({ hello: 'world2' });
  });
});

/*

call-delegator
  side-effects
    STANDBY
    ou CALL_DELEGATION_PREPARED
      -> teravoz api called
      -> CALL_DELEGATED
  rules
    call-delegation

function callDelegation(events) {
  state = reduce(asdas,asdas)
  (command) => {
    if(state is standy)
    return CALL_DELEGATION_PREPARED
  }
}

TODO
Remote event-store
dashboard: Apollo subscritions
Refactor teravoz-event-handler -> call-delegator
*/
