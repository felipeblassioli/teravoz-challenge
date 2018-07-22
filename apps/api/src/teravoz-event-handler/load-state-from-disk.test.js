const test = require('ava');
const fs = require('fs');
const loadStateFromDisk = require('./load-state-from-disk');
const { fromJS } = require('immutable');

test('Return null if file does not exists', async t => {
  const state = await loadStateFromDisk('unexisting-state.json');
  t.true(state === null);
});

test('Loads state from json file', async t => {
  const filepath = '/tmp/saved-state.json';
  const stateJS = {
    returningCustomers: {},
    ongoingCalls: {},
  };
  fs.writeFileSync(filepath, JSON.stringify(stateJS));
  const state = await loadStateFromDisk(filepath);

  t.true(fromJS(stateJS).equals(state));
  fs.unlinkSync(filepath);
});
