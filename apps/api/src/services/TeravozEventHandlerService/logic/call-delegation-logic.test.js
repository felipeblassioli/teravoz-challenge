const test = require('ava');
const { EMPTY_STATE } = require('../reducer');
const actions = require('../actions');
const callDelegationLogic = require('./call-delegation-logic');
const { createMockStore } = require('redux-logic-test');
const { Map } = require('immutable');
const sinon = require('sinon');

function testCallDelegation(t, initialState, actions, expected) {
  const delegate = sinon.spy();

  const store = createMockStore({
    initialState,
    logic: [callDelegationLogic],
    injectedDeps: { teravozService: { delegate } },
  });

  actions.forEach(store.dispatch);

  // FIXME: Find a prettier way to async test this
  return new Promise(resolve => {
    store.whenComplete(() => {
      t.true(delegate.calledOnceWith(sinon.match(expected)));
      resolve();
    });
  });
}

test(
  'Calls from returning customers are delegated to 901',
  testCallDelegation,
  Map({
    returningCustomers: Map({
      '551199996666': true,
    }),
  }),
  [
    {
      type: actions.TERAVOZ_CALL_STANDBY,
      payload: {
        teravozType: 'call.standby',
        callId: '1463669263.30033',
        code: '123456',
        direction: 'inbound',
        ourNumber: '0800000000',
        theirNumber: '551199996666',
        timestamp: '2017-01-01T00:00:00Z',
      },
    },
  ],
  {
    call_id: '1463669263.30033',
    destination: '901',
  }
);

test(
  'Calls from new customers are delegated to 900',
  testCallDelegation,
  /* There are no returning users in EMPTY_STATE */
  EMPTY_STATE,
  [
    {
      type: actions.TERAVOZ_CALL_STANDBY,
      payload: {
        teravozType: 'call.standby',
        callId: '1463669263.30033',
        code: '123456',
        direction: 'inbound',
        ourNumber: '0800000000',
        theirNumber: '11991910000',
        timestamp: '2017-01-01T00:00:00Z',
      },
    },
  ],
  {
    call_id: '1463669263.30033',
    destination: '900',
  }
);

test('When teravoz service delegate fails dispatch CALL_DELEGATION_ERROR action', t => {
  const actionsToBeDispatched = [
    {
      type: actions.TERAVOZ_CALL_STANDBY,
      payload: {
        teravozType: 'call.standby',
        callId: '1463669263.30033',
        code: '123456',
        direction: 'inbound',
        ourNumber: '0800000000',
        theirNumber: '11991910000',
        timestamp: '2017-01-01T00:00:00Z',
      },
    },
  ];
  const initialState = EMPTY_STATE;
  const delegate = function() {
    throw new Error('Teravoz service returned 500!');
  };

  const store = createMockStore({
    initialState,
    logic: [callDelegationLogic],
    injectedDeps: { teravozService: { delegate } },
  });

  actionsToBeDispatched.forEach(store.dispatch);

  // FIXME: Find a prettier way to async test this
  return new Promise(resolve => {
    store.whenComplete(() => {
      const delegationErrorAction = store.actions.find(
        ({ type }) => type === actions.CALL_DELEGATION_ERROR
      );
      t.truthy(delegationErrorAction);
      resolve();
    });
  });
});
