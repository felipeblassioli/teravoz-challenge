const debug = require('debug')('event-store-server');
const zmq = require('zeromq');
const { APPEND_EVENT, PUB_PORT_REQUEST } = require('./message-types');

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');

/**
 * The EventStore server stores all events using sqlite.
 * All communication is handle by zmq's REP and PUB sockets.
 */
class EventStoreServer {
  constructor({ bindAddress }) {
    this.bindAddress = bindAddress;
    this.repPort = new URL(bindAddress).port;
    this.pubPort = (parseInt(this.repPort, 10) + 1).toString();
    this.publisher = zmq.socket('pub');
    this.responder = zmq.socket('rep');
  }

  start() {
    this.initPubSubSocket(this.bindAddress);
    this.initRepRespSocket(this.bindAddress);
  }

  onEventReceived(evt) {
    this.publisher.send(JSON.stringify(evt));
  }

  initRepRespSocket(bindAddress) {
    const responder = this.responder;

    responder.on('message', request => {
      debug(`Received message [${request.toString()}]`);
      const message = JSON.parse(request.toString());

      switch (message.type) {
        case PUB_PORT_REQUEST:
          responder.send(this.pubPort);
          break;
        case APPEND_EVENT:
          this.onEventReceived(message.payload);
          responder.send('ok');
          break;
      }
    });

    responder.bindSync(bindAddress);
    debug(`REP socket bound to ${bindAddress}`);
  }

  initPubSubSocket(repBindAddress) {
    // FIXME: Is there a better way to create this uri?
    var bindAddress = new URL(repBindAddress);
    bindAddress.port = this.pubPort;
    bindAddress = bindAddress.toString();

    const publisher = this.publisher;
    publisher.bindSync(bindAddress);
    debug(`PUB socket bound to ${bindAddress}`);
  }
}

module.exports = EventStoreServer;
