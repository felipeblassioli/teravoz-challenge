function callNew({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.new',
    call_id: callId,
    code: code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    their_number_type: 'mobile',
    timestamp: new Date().toISOString(),
  };
}

function callStandby({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.standby',
    call_id: callId,
    code: code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    timestamp: new Date().toISOString(),
  };
}

function callWaiting({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.waiting',
    call_id: callId,
    code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    timestamp: new Date().toISOString(),
  };
}

function actorEntered({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.waiting',
    call_id: callId,
    code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    timestamp: new Date().toISOString(),
  };
}

function callOngoing({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.ongoing',
    call_id: callId,
    code: code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    timestamp: new Date().toISOString(),
  };
}

function actorLeft({ callId, code }) {
  return {
    type: 'actor.left',
    call_id: callId,
    code: code,
    actor: 'user.name@email.com',
    number: '200',
    timestamp: new Date().toISOString(),
  };
}

function callFinished({ callId, code, ourNumber, theirNumber }) {
  return {
    type: 'call.finished',
    call_id: callId,
    code,
    direction: 'inbound',
    our_number: ourNumber,
    their_number: theirNumber,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  callNew,
  callStandby,
  callWaiting,
  actorEntered,
  callOngoing,
  actorLeft,
  callFinished,
};
