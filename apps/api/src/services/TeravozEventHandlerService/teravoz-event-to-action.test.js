const test = require('ava');
const actions = require('./actions');
const teravozEventToAction = require('./teravoz-event-to-action');

function testTeravozEventTranslation(t, input, expected) {
  t.deepEqual(teravozEventToAction(input), expected);
}

testTeravozEventTranslation.title = (_, input, expected) =>
  `Translate teravoz ${input.type} event to ${expected.type} action`;

test(
  testTeravozEventTranslation,
  {
    type: 'call.new',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11999990000',
    their_number_type: 'mobile',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_CALL_NEW,
    payload: {
      teravozType: 'call.new',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11999990000',
      theirNumberType: 'mobile',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'call.standby',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11991910000',
    timestamp: '2017-01-01T00:00:00Z',
  },
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
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'call.waiting',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11991910000',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_CALL_WAITING,
    payload: {
      teravozType: 'call.waiting',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910000',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'actor.entered',
    call_id: '1463669263.30033',
    code: '123456',
    actor: 'user.name@email.com',
    number: '200',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_ACTOR_ENTERED,
    payload: {
      teravozType: 'actor.entered',
      callId: '1463669263.30033',
      code: '123456',
      actor: 'user.name@email.com',
      number: '200',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'call.ongoing',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11991910000',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_CALL_ONGOING,
    payload: {
      teravozType: 'call.ongoing',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910000',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'actor.left',
    call_id: '1463669263.30033',
    code: '123456',
    actor: 'user.name@email.com',
    number: '200',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_ACTOR_LEFT,
    payload: {
      teravozType: 'actor.left',
      callId: '1463669263.30033',
      code: '123456',
      actor: 'user.name@email.com',
      number: '200',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test(
  testTeravozEventTranslation,
  {
    type: 'call.finished',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11991910000',
    timestamp: '2017-01-01T00:00:00Z',
  },
  {
    type: actions.TERAVOZ_CALL_FINISHED,
    payload: {
      teravozType: 'call.finished',
      callId: '1463669263.30033',
      code: '123456',
      direction: 'inbound',
      ourNumber: '0800000000',
      theirNumber: '11991910000',
      timestamp: '2017-01-01T00:00:00Z',
    },
  }
);

test('When teravoz event is invalid throw error', t => {
  const invalidTeravozEvent = {
    type: 'INVALID_EVENT_TYPE',
    call_id: '1463669263.30033',
    code: '123456',
  };
  try {
    teravozEventToAction(invalidTeravozEvent);
    t.fail('teravozEventToAction must throw an error!');
  } catch (error) {
    t.pass();
  }
});
