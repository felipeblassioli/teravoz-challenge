const test = require('ava');
const fs = require('fs');
const { fromJS } = require('immutable');
const DiskStorageService = require('./DiskStorageService');

test('Save state to json file synchronously', t => {
  const state = {
    returningCustomers: {},
    ongoingCalls: {},
  };

  const filepath = '/tmp/saved-state.json';
  const service = new DiskStorageService();
  service.save(fromJS(state), filepath);

  t.deepEqual(state, require(filepath));

  fs.unlinkSync('/tmp/saved-state.json');
});

test('Return null if file does not exists', async t => {
  const service = new DiskStorageService();
  const state = await service.load('unexisting-state.json');
  t.true(state === null);
});

test('Loads state from json file', async t => {
  const filepath = '/tmp/saved-state.json';
  const stateJS = {
    returningCustomers: {},
    ongoingCalls: {},
  };
  fs.writeFileSync(filepath, JSON.stringify(stateJS));

  const service = new DiskStorageService();
  const state = await service.load(filepath);

  t.true(fromJS(stateJS).equals(state));
  fs.unlinkSync(filepath);
});
