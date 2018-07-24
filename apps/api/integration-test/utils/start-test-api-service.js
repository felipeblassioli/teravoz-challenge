const buildFastifyApp = require('../../src/build-fastify-app');

const start = async ({
  port,
  host = 'localhost',
  teravozServiceUrl,
  savedStatePath,
}) => {
  const fastify = await buildFastifyApp({
    logger: false,
    teravozServiceUrl,
    savedStatePath,
  });

  try {
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = start;
