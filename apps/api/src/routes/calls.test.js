const test = require('ava');
const Fastify = require('fastify');
const callsRoute = require('./calls');
const buildServicesDAG = require('../build-services-dag');

test.beforeEach(async t => {
  const fastify = Fastify();
  const { teravozEventHandlerService } = await buildServicesDAG();

  fastify.register(callsRoute, { teravozEventHandlerService });

  t.context.fastify = fastify;
});

test.afterEach(t => {
  t.context.fastify.close();
});

test('No active calls', async t => {
  const response = await t.context.fastify.inject({
    method: 'GET',
    url: '/calls/active',
  });

  t.deepEqual(JSON.parse(response.payload), {
    data: {},
  });
});
