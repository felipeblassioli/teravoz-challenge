#!/usr/bin/env node
'use strict';
const buildFastifyApp = require('./src/build-fastify-app');

const start = async () => {
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 3001;

  const webhookUrl = process.env.TARGET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error(
      `Required environment variable missing! TARGET_WEBHOOK_URL is unset`
    );
    process.exit(1);
  }

  const simulationAutoStart = process.env.SIMULATION_AUTO_START;
  const simulationNewCallsDelay =
    process.env.SIMULATION_NEW_CALLS_DELAY || 7000;
  const fastify = buildFastifyApp({
    webhookUrl,
    simulationNewCallsDelay,
    simulationAutoStart,
  });
  if (simulationAutoStart) {
    fastify.log.info('Simulation will start automatically.');
    fastify.log.info(
      `Simulation new call interval is ${simulationNewCallsDelay}ms`
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
