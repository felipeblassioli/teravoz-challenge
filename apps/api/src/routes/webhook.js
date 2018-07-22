const TeravozEventHandler = require('../teravoz-event-handler');

async function webhookRoute(fastify, options) {
  const teravozEventHandler = new TeravozEventHandler();
  await teravozEventHandler.init();

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
      teravozEventHandler.handleEvent(request.body);
      reply.code(200).send();
    } catch (error) {
      reply.code(400).send();
    }
  });
}

module.exports = webhookRoute;
