const { Map } = require('immutable');

const {
  TERAVOZ_CALL_ONGOING,
  TERAVOZ_ACTOR_LEFT,
  TERAVOZ_CALL_FINISHED,
} = require('./actions');

const EMPTY_STATE = Map({
  returningCustomers: Map(),
  ongoingCalls: Map(),
});

function returningCustomerReducer(previousState, action) {
  switch (action.type) {
    case TERAVOZ_CALL_FINISHED:
      const { theirNumber } = action.payload;
      return previousState.setIn(['returningCustomers', theirNumber], true);
    default:
      return previousState;
  }
}

const getReturningCustomers = state => state.get('returningCustomers');

function ongoingCallsReducer(previousState, action) {
  switch (action.type) {
    case TERAVOZ_CALL_ONGOING:
      return previousState.setIn(
        ['ongoingCalls', action.payload.callId],
        action.payload
      );
    case TERAVOZ_ACTOR_LEFT:
    case TERAVOZ_CALL_FINISHED:
      return previousState.deleteIn(['ongoingCalls', action.payload.callId]);
    default:
      return previousState;
  }
}

function reducer(state = EMPTY_STATE, action) {
  state = returningCustomerReducer(state, action);
  return ongoingCallsReducer(state, action);
}

const getOngoingCalls = state => state.get('ongoingCalls');

module.exports = {
  EMPTY_STATE,
  getReturningCustomers,
  getOngoingCalls,
  reducer,
};
