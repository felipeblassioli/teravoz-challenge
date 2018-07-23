async function webhookRoute(fastify, options = {}) {
  const { callSimulatorService } = options;

  const opts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          call_id: { type: 'string' },
          destination: { type: 'string' },
        },
      },
    },
  };

  fastify.post('/actions', opts, async (request, reply) => {
    const callId = request.body['call_id'];
    const destination = request.body['destination'];

    if (request.body.type === 'delegate') {
      fastify.log.info(`STARTED: simulateSecondHalf for call_id=${callId}`);

      await callSimulatorService
        .simulateSecondHalf({ callId, destination })
        .then(() => {
          fastify.log.info(
            `FINISHED: simulateSecondHalf for call_id=${callId}`
          );
        });
    }

    reply.send();
  });
}

module.exports = webhookRoute;
