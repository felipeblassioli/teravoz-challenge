const Fastify = require('fastify');
const CallSimulatorService = require('./services/CallSimulatorService');
const WebhookService = require('./services/WebhookService');

function buildFastifyApp(options = {}) {
  const { webhookUrl } = options;

  const fastify = Fastify({
    logger: true,
    ...options,
  });

  const webhookService = new WebhookService({ webhookUrl });
  const callSimulatorService = new CallSimulatorService({
    dispatchEvent(event) {
      return webhookService.notifyWebhook(event);
    },
  });

  fastify.register(require('./routes/actions'), {
    callSimulatorService,
  });

  fastify.ready(err => {
    if (err) throw err;

    setInterval(() => {
      callSimulatorService.simulateFirstHalf();
    }, 7000);
  });

  return fastify;
}

module.exports = buildFastifyApp;
