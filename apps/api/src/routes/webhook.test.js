const test = require('ava');
const Fastify = require('fastify');
const webhookRoute = require('./webhook');
const buildServicesDAG = require('../build-services-dag');

async function testWebhookRoute(t, input, assertionsFn) {
  const fastify = Fastify();
  const { teravozEventHandlerService } = await buildServicesDAG();

  fastify.register(webhookRoute, { teravozEventHandlerService });

  const response = await fastify.inject({
    method: 'POST',
    url: '/webhook',
    payload: input,
  });

  assertionsFn(t, response);
  fastify.close();
}

async function testValidTeravozEvent(t, input, expected) {
  await testWebhookRoute(t, input, (t, response) => {
    t.true(response.statusCode === 200);
  });
}

testValidTeravozEvent.title = (_, input, expected) =>
  `Accepts ${input.type} teravoz event`;

async function testInvalidTeravozEvent(t, input) {
  await testWebhookRoute(t, input, (t, response) => {
    t.true(response.statusCode === 400);
  });
}

testInvalidTeravozEvent.title = (_, input, expected) =>
  `When teravoz event is invalid status code is 400`;

test(testValidTeravozEvent, {
  type: 'call.new',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11999990000',
  their_number_type: 'mobile',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'call.standby',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11991910000',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'call.waiting',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11991910000',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'actor.entered',
  call_id: '1463669263.30033',
  code: '123456',
  actor: 'user.name@email.com',
  number: '200',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'call.ongoing',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11991910000',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'actor.left',
  call_id: '1463669263.30033',
  code: '123456',
  actor: 'user.name@email.com',
  number: '200',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testValidTeravozEvent, {
  type: 'call.finished',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11991910000',
  timestamp: '2017-01-01T00:00:00Z',
});

test(testInvalidTeravozEvent, {
  type: 'INVALID_EVENT_TYPE',
  call_id: '1463669263.30033',
  code: '123456',
  direction: 'inbound',
  our_number: '0800000000',
  their_number: '11991910000',
  timestamp: '2017-01-01T00:00:00Z',
});
