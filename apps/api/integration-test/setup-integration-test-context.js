const faker = require('faker');
const nodeFetch = require('node-fetch');
const startTestApiService = require('./utils/start-test-api-service');
const startTestTeravozService = require('./utils/start-test-teravoz-service');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const STATE_DIRECTORY = '/tmp/teravoz-challenge-test';

/**
 * Create if not exists a directory to store saved state files.
 * Start API service and a fake TeravozService that responds for /actions
 * Setup convenient assertions in the test context.
 */
module.exports = {
  async setup(t) {
    mkdirp.sync(STATE_DIRECTORY);

    const apiPort = faker.random.number({ min: 1001, max: 65535 });
    const teravozPort = faker.random.number({ min: 1001, max: 65535 });

    await startTestApiService({
      port: apiPort,
      host: 'localhost',
      teravozServiceUrl: `http://localhost:${teravozPort}`,
      savedStatePath: `${STATE_DIRECTORY}/${faker.random.uuid()}`,
    });
    const teravozService = await startTestTeravozService({
      port: teravozPort,
      host: 'localhost',
    });

    t.context.callWebhook = function(payload) {
      return nodeFetch(`http://localhost:${apiPort}/webhook`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
    };

    t.context.createRandomCallContext = () => ({
      callId: faker.random.uuid(),
      code: faker.address.zipCode(),
      ourNumber: faker.phone.phoneNumber(),
      theirNumber: faker.phone.phoneNumber(),
    });

    t.context.assertions = {};

    t.context.assertions.lastCallDelegatedTo = destination => {
      return teravozService.lastDelegateDestination === destination;
    };

    t.context.assertions.getActiveCallsCount = async () => {
      const json = await nodeFetch(
        `http://localhost:${apiPort}/calls/active`
      ).then(res => res.json());
      const activeCalls = json.data;
      return Object.keys(activeCalls).length;
    };
  },

  tearDown(t) {
    rimraf.sync(STATE_DIRECTORY);
  },
};
