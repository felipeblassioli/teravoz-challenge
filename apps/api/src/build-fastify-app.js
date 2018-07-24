const Fastify = require('fastify');
const buildServicesDAG = require('./build-services-dag');

async function buildFastifyApp(opts = {}) {
  const fastify = Fastify({
    logger: true,
    ...opts,
  });

  const { teravozEventHandlerService } = await buildServicesDAG(opts);

  fastify.register(require('./routes/webhook'), { teravozEventHandlerService });
  fastify.register(require('./routes/calls'), { teravozEventHandlerService });

  return fastify;
}

module.exports = buildFastifyApp;
