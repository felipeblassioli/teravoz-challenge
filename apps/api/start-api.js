#!/usr/bin/env node
'use strict';
const buildFastifyApp = require('./src/build-fastify-app');

const start = async () => {
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 3002;

  const teravozServiceUrl = process.env.TERAVOZ_SERVICE_URL;
  const savedStatePath = process.env.SAVED_STATE_FILEPATH;
  const fastify = await buildFastifyApp({
    teravozServiceUrl,
    savedStatePath,
  });
  if (savedStatePath) {
    fastify.log.info(
      `Persistent state is ENABLED. Most up-to-date state gonna be saved at ${savedStatePath}`
    );
  } else {
    fastify.log.warn(
      'Persistent state is DISABLED. Set environment variable SAVED_STATE_FILEPATH to enable it.'
    );
  }

  try {
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
