const Fastify = require('fastify');

/**
 * Endpoint /actions stores request.body['destination] into lastDelegateDestination variable
 */
function buildFastifyApp() {
  const fastify = Fastify();
  fastify.lastDelegateDestination = null;

  fastify.post('/actions', (request, reply) => {
    const destination = request.body['destination'];

    fastify.lastDelegateDestination = destination;

    reply.send();
  });

  return fastify;
}

async function startTestTeravozService({ port, host = 'localhost' }) {
  const fastify = buildFastifyApp();

  try {
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  return fastify;
}

module.exports = startTestTeravozService;
