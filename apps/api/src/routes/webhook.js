async function webhookRoute(fastify, options = {}) {
  const { teravozEventHandlerService } = options;
  if (!teravozEventHandlerService) {
    throw new Error('TeravozEventHandlerService is required!');
  }

  const opts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          type: { type: 'string' },
        },
      },
    },
  };

  fastify.post('/webhook', opts, (request, reply) => {
    try {
      teravozEventHandlerService.handleEvent(request.body);
      reply.code(200).send();
    } catch (error) {
      reply.code(400).send();
    }
  });
}

module.exports = webhookRoute;
