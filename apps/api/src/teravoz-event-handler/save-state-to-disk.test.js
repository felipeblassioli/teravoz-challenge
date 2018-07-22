const test = require('ava');
const fs = require('fs');
const saveStateToDisk = require('./save-state-to-disk');
const { fromJS } = require('immutable');

test('Save state to json file synchronously', t => {
  const state = {
    returningCustomers: {},
    ongoingCalls: {},
  };

  const filepath = '/tmp/saved-state.json';
  saveStateToDisk(fromJS(state), filepath);

  t.deepEqual(state, require(filepath));
});

test.afterEach('cleanup', t => {
  fs.unlinkSync('/tmp/saved-state.json');
});
