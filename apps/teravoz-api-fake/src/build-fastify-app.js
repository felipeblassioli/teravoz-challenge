const Fastify = require('fastify');
const cors = require('cors');
const CallSimulatorService = require('./services/CallSimulatorService');
const WebhookService = require('./services/WebhookService');

function buildFastifyApp(options = {}) {
  const { webhookUrl, simulationNewCallsDelay, simulationAutoStart } = options;

  const fastify = Fastify({
    logger: true,
    ...options,
  });
  fastify.use(
    cors({
      origin: '*',
    })
  );

  const webhookService = new WebhookService({ webhookUrl });
  const callSimulatorService = new CallSimulatorService({
    dispatchEvent(event) {
      return webhookService.notifyWebhook(event);
    },
  });

  fastify.register(require('./routes/actions'), {
    callSimulatorService,
  });

  fastify.register(require('./routes/simulation'), {
    callSimulatorService,
  });

  fastify.ready(err => {
    if (err) throw err;

    if (simulationAutoStart) {
      callSimulatorService.start({
        simulationNewCallsDelay,
      });
      fastify.log.info('Simulation started!');
    }
  });

  return fastify;
}

module.exports = buildFastifyApp;
