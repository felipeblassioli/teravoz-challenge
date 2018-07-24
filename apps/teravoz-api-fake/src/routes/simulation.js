const camelize = require('camelize');

async function simulationRoute(fastify, options = {}) {
  const { callSimulatorService } = options;

  fastify.post('/simulation/call/new', async (request, reply) => {
    await callSimulatorService.simulateFirstHalf(camelize(request.body));
    reply.send();
  });

  fastify.post('/simulation/call/start', (request, reply) => {
    callSimulatorService.start({
      newCallsDelay: request.body['new_calls_interval_delay'],
    });
    reply.send();
  });

  fastify.post('/simulation/call/stop', (request, reply) => {
    callSimulatorService.stop();
    reply.send();
  });
}

module.exports = simulationRoute;
