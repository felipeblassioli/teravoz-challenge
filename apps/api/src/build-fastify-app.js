const Fastify = require('fastify');

function buildFastifyApp(opts = {}) {
  const { teravozServiceUrl, savedStatePath } = opts;
  const fastify = Fastify({
    logger: true,
    ...opts,
  });

  fastify.register(require('./routes/webhook'), {
    teravozServiceUrl,
    savedStatePath,
  });
  return fastify;
}

module.exports = buildFastifyApp;
