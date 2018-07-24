const camelize = require('camelize');

async function simulationRoute(fastify, options = {}) {
  const { callSimulatorService } = options;

  fastify.post('/simulation/call/new', async (request, reply) => {
    let callContextOverrides = camelize(request.body);
    if (callContextOverrides.targetDuration) {
      callContextOverrides.targetDuration =
        callContextOverrides.targetDuration * 1000;
    }
    await callSimulatorService.simulateFirstHalf(callContextOverrides);
    reply.send();
  });

  fastify.post('/simulation/start', (request, reply) => {
    callSimulatorService.start({
      newCallsDelay: request.body['new_calls_interval_delay'],
    });
    reply.send();
  });

  fastify.post('/simulation/stop', (request, reply) => {
    callSimulatorService.stop();
    reply.send();
  });

  fastify.get('/simulation/status', (request, reply) => {
    reply.send({
      data: {
        status: callSimulatorService.status,
      },
    });
  });
}

module.exports = simulationRoute;
