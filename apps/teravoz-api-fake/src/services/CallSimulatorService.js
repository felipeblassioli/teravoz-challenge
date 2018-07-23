const {
  callNew,
  callStandby,
  callWaiting,
  actorEntered,
  callOngoing,
  actorLeft,
  callFinished,
} = require('../utils/teravoz-events-creators');
const sleep = require('../utils/sleep');
const faker = require('faker');

class CallSimulatorService {
  constructor({ dispatchEvent }) {
    this.dispatchEvent = dispatchEvent;
    this.state = {
      call: {},
    };
  }

  async dispatch(event) {
    console.log(`Dispatch ${event.type}`);
    console.log(event);
    if (this.dispatchEvent) {
      await this.dispatchEvent(event);
    }
  }

  /**
   * Dispatches events: call.new, call.standby
   */
  async simulateFirstHalf() {
    const callContext = {
      callId: faker.random.uuid(),
      code: faker.address.zipCode(),
      ourNumber: faker.phone.phoneNumber(),
      theirNumber: faker.phone.phoneNumber(),
    };

    this.state.call[callContext.callId] = callContext;

    await this.dispatch(callNew(callContext));
    await sleep(400);
    await this.dispatch(callStandby(callContext));
  }

  /**
   * Dispatches events: call.waiting, actor.entered, call.ongoing, actor.left, call.finished
   */
  async simulateSecondHalf({ callId, destination }) {
    const callContext = this.state.call[callId];
    if (!callContext) {
      throw new Error(`Call context not found for callId=${callId}`);
    }

    // Happy case: the call finishes
    // We could simulate other scenarios

    await sleep(1000);
    await this.dispatch(callWaiting(callContext));
    await this.dispatch(actorEntered(callContext));
    await sleep(400);
    await this.dispatch(callOngoing(callContext));
    await sleep(2000);
    await this.dispatch(actorLeft(callContext));
    await sleep(500);
    await this.dispatch(callFinished(callContext));

    delete this.state[callContext.callId];
  }
}

/*
  destinationToPhoneNumber(destination) {
    switch(destination) {
      case '900':
        return '551199999999'
      case '901':
        return '551155554444'
      default:
        return '551122223333'
    }
  }
  */

module.exports = CallSimulatorService;
