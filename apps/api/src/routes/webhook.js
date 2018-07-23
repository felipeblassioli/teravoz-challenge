const TeravozService = require('../services/TeravozService');
const StateStorageService = require('../services/DiskStorageService');
const TeravozEventHandler = require('../services/TeravozEventHandlerService');

async function webhookRoute(fastify, options = {}) {
  const { teravozServiceUrl, savedStatePath } = options;
  const teravozService =
    teravozServiceUrl && new TeravozService({ baseUrl: teravozServiceUrl });
  const stateStorageService =
    savedStatePath && new StateStorageService({ savedStatePath });

  const teravozEventHandler = new TeravozEventHandler({
    teravozService,
    stateStorageService,
  });
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
