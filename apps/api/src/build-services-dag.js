/**
 * This builds all services instances required by the application.
 * This is the only place that services are instantiated.
 */
async function buildServicesDAG(config = {}) {
  const TeravozService = require('./services/TeravozService');
  const StateStorageService = require('./services/DiskStorageService');
  const TeravozEventHandler = require('./services/TeravozEventHandlerService');

  const { teravozServiceUrl, savedStatePath } = config;
  const teravozService =
    teravozServiceUrl && new TeravozService({ baseUrl: teravozServiceUrl });
  const stateStorageService =
    savedStatePath && new StateStorageService({ savedStatePath });
  const teravozEventHandlerService = new TeravozEventHandler({
    teravozService,
    stateStorageService,
  });

  await teravozEventHandlerService.init();

  return {
    teravozService,
    stateStorageService,
    teravozEventHandlerService,
  };
}

module.exports = buildServicesDAG;
