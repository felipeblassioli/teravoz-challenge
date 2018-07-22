const {
  TERAVOZ_CALL_NEW,
  TERAVOZ_CALL_STANDBY,
  TERAVOZ_CALL_WAITING,
  TERAVOZ_ACTOR_ENTERED,
  TERAVOZ_CALL_ONGOING,
  TERAVOZ_ACTOR_LEFT,
  TERAVOZ_CALL_FINISHED,
} = require('./actions');
const camelize = require('camelize');

const TERAVOZ_TYPE_MAP = {
  'call.new': TERAVOZ_CALL_NEW,
  'call.standby': TERAVOZ_CALL_STANDBY,
  'call.waiting': TERAVOZ_CALL_WAITING,
  'actor.entered': TERAVOZ_ACTOR_ENTERED,
  'call.ongoing': TERAVOZ_CALL_ONGOING,
  'actor.left': TERAVOZ_ACTOR_LEFT,
  'call.finished': TERAVOZ_CALL_FINISHED,
};

function teravozEventToAction(evt) {
  const { type: teravozType, ...teravozPayload } = evt;
  const actionType = TERAVOZ_TYPE_MAP[teravozType];
  if (actionType) {
    return {
      type: actionType,
      payload: {
        teravozType,
        ...camelize(teravozPayload),
      },
    };
  } else {
    throw new Error(`Teravoz event without mapping. evt.type=${teravozType}`);
  }
}

module.exports = teravozEventToAction;
