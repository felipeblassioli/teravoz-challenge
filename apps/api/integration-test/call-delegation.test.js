const test = require('ava');
const sleep = require('./utils/sleep');
const event = require('./utils/event');
const {
  setup: setupIntegrationTestContext,
  tearDown: tearDownIntegrationTestContext,
} = require('./setup-integration-test-context');

test.beforeEach(setupIntegrationTestContext);
test.afterEach(tearDownIntegrationTestContext);

test('Returning user call delegated to 900 and finished successfully', async t => {
  const { callWebhook, createRandomCallContext } = t.context;
  const { lastCallDelegatedTo, getActiveCallsCount } = t.context.assertions;

  const callContext = createRandomCallContext();

  await callWebhook(event.callNew(callContext));
  await callWebhook(event.callStandby(callContext));
  await sleep(300);
  t.true(lastCallDelegatedTo('900'));

  await callWebhook(event.callWaiting(callContext));
  await callWebhook(event.actorEntered(callContext));
  await callWebhook(event.callOngoing(callContext));

  await sleep(300);
  t.is(await getActiveCallsCount(), 1);

  await callWebhook(event.actorLeft(callContext));
  await callWebhook(event.callFinished(callContext));

  await sleep(300);
  t.is(await getActiveCallsCount(), 0);
});

test('Returning customer call delegated to 901 and finished successffully', async t => {
  let callContext;
  const { callWebhook, createRandomCallContext } = t.context;
  const { lastCallDelegatedTo, getActiveCallsCount } = t.context.assertions;

  // First call
  callContext = createRandomCallContext();
  await callWebhook(event.callNew(callContext));
  await callWebhook(event.callStandby(callContext));
  await callWebhook(event.callWaiting(callContext));
  await callWebhook(event.actorEntered(callContext));
  await callWebhook(event.callOngoing(callContext));
  await callWebhook(event.actorLeft(callContext));
  await callWebhook(event.callFinished(callContext));

  // Second call
  callContext = {
    ...createRandomCallContext(),
    theirNumber: callContext.theirNumber,
  };
  await callWebhook(event.callNew(callContext));
  await callWebhook(event.callStandby(callContext));
  await sleep(300);
  t.true(lastCallDelegatedTo('901'));

  await callWebhook(event.callWaiting(callContext));
  await callWebhook(event.actorEntered(callContext));
  await callWebhook(event.callOngoing(callContext));

  await sleep(300);
  t.is(await getActiveCallsCount(), 1);

  await callWebhook(event.actorLeft(callContext));
  await callWebhook(event.callFinished(callContext));

  await sleep(300);
  t.is(await getActiveCallsCount(), 0);
});
