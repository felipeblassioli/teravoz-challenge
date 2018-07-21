const test = require('ava');
const actions = require('./actions');
const rootReducer = require('./reducer');

/**
 * Given a list of inputActions
 * Computes de final state after applying serially all actions.
 * Then verifies if the final state is correct.
 */
function reducerTest(
  t,
  reducer,
  inputActions,
  assertState,
  initialState = undefined
) {
  const state = inputActions.reduce(
    (state, action) => reducer(state, action),
    initialState
  );

  assertState(t, state);
}

/**
 * Scenario with 3 ongoing calls, then 2 finish.
 */
const ongoingCallsScenario = [
  {
    type: actions.TERAVOZ_CALL_ONGOING,
    payload: {
      teravozType: 'call.ongoing',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910033',
      timestamp: '2017-01-01T00:00:00Z',
    },
  },
  {
    type: actions.TERAVOZ_CALL_ONGOING,
    payload: {
      teravozType: 'call.ongoing',
      callId: '1463669263.30044',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910044',
      timestamp: '2017-01-01T00:00:00Z',
    },
  },
  {
    type: actions.TERAVOZ_CALL_ONGOING,
    payload: {
      teravozType: 'call.ongoing',
      callId: '1463669263.30055',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910055',
      timestamp: '2017-01-01T00:00:00Z',
    },
  },
  {
    type: actions.TERAVOZ_CALL_FINISHED,
    payload: {
      teravozType: 'call.finished',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910033',
      timestamp: '2017-01-01T00:10:00Z',
    },
  },
  {
    type: actions.TERAVOZ_CALL_FINISHED,
    payload: {
      teravozType: 'call.finished',
      callId: '1463669263.30055',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910055',
      timestamp: '2017-01-01T00:15:00Z',
    },
  },
];

test(
  'Delete finished ongoing calls and remember ongoingCalls',
  reducerTest,
  rootReducer,
  ongoingCallsScenario,
  (t, state) => {
    const ongoingCalls = state.get('ongoingCalls');
    t.true(ongoingCalls.size === 1);
    t.truthy(ongoingCalls.get('1463669263.30044'));
  }
);

test(
  'Remember returning customers',
  reducerTest,
  rootReducer,
  [
    {
      type: actions.TERAVOZ_CALL_ONGOING,
      payload: {
        teravozType: 'call.ongoing',
        callId: '1463669263.30044',
        code: '123456',
        direction: 'inbound',
        ourNumber: '0800000000',
        theirNumber: '11991910044',
        timestamp: '2017-01-01T00:00:00Z',
      },
    },
    {
      type: actions.TERAVOZ_CALL_FINISHED,
      payload: {
        teravozType: 'call.finished',
        callId: '1463669263.30033',
        code: '123456',
        direction: 'inbound',
        ourNumber: '0800000000',
        theirNumber: '11991910033',
        timestamp: '2017-01-01T00:10:00Z',
      },
    },
  ],
  (t, state) => {
    const returningCustomers = state.get('returningCustomers');
    t.true(returningCustomers.size === 1);
    t.truthy(returningCustomers.get('11991910033'));
    // Call still ongoing
    t.false(returningCustomers.get('11991910044', false));
  }
);
