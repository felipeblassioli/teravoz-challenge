const Fastify = require('fastify');

function buildFastifyApp() {
  const fastify = Fastify();

  Fastify.register(require('./routes/webhook'));

  return fastify;
}

module.exports = buildFastifyApp;
