const { createLogic } = require('redux-logic');
const { getReturningCustomers } = require('../reducer');
const {
  TERAVOZ_CALL_STANDBY,
  CALL_DELEGATION_SUCCESS,
  CALL_DELEGATION_ERROR,
} = require('../actions');

const callDelagationLogic = createLogic({
  type: TERAVOZ_CALL_STANDBY,
  async process({ getState, action, teravozService }, dispatch, done) {
    const { theirNumber, callId } = action.payload;

    const isReturningCustomer = getReturningCustomers(getState()).get(
      theirNumber,
      false
    );

    const destination = isReturningCustomer ? '901' : '900';
    try {
      const teravozServiceDelegatePayload = {
        type: 'delegate',
        call_id: callId,
        destination,
      };
      await teravozService.delegate(teravozServiceDelegatePayload);
      dispatch({
        type: CALL_DELEGATION_SUCCESS,
        payload: {
          callId,
          theirNumber,
          teravozServiceDelegatePayload,
        },
      });
    } catch (error) {
      dispatch({
        type: CALL_DELEGATION_ERROR,
        payload: {
          callId,
          theirNumber,
          error: JSON.stringify(error),
        },
      });
    }
    done();
  },
});

module.exports = callDelagationLogic;
