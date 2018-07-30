const debug = require('debug')('event-store-client');
const zmq = require('zeromq');
const { APPEND_EVENT, PUB_PORT_REQUEST } = require('./message-types');

class EventStore {
  /**
   * @param {String} uri: EventStore's server uri. Example tcp://localhost:5555
   */
  constructor({ uri }) {
    this.serverUri = uri;
    this.reqSocketConnected = false;
    this.subSocketConnected = false;
    this.pubPort = null;
    this.subscribers = [];
    this.requester = zmq.socket('req');
  }

  /*
  * Connect to serverUri with a REQ socket.
  * Ask for server's pub socket port.
  * Create a sub socket bound to that port and listen for messages.
  * */
  connect() {
    return new Promise((resolve, reject) => {
      const requester = this.requester;
      requester.connect(this.serverUri);
      debug(`connected to rep socket. uri=${this.serverUri}`);

      requester.on('message', reply => {
        const pubPort = reply.toString();
        debug(`Received reply [${reply.toString()}]`);
        resolve(pubPort);
      });

      requester.send(JSON.stringify({ type: PUB_PORT_REQUEST }));
    })
      .then(pubPort => {
        this.pubPort = pubPort;
      })
      .then(() => {
        this.reqSocketConnected = true;
      });
  }

  connectSubSocket(port) {
    debug('Connecting sub socket...');
    return new Promise((resolve, reject) => {
      // FIXME: Better way to create url with differente port?
      let uri = new URL(this.serverUri);
      uri.port = port;
      uri = uri.toString();

      const subscriber = zmq.socket('sub');
      subscriber.on('message', message => {
        debug(`Subscriber received message=${message.toString()}`);
        const messageJSON = JSON.parse(message.toString());
        this.notifySubscribers(messageJSON);
      });

      subscriber.connect(uri);
      subscriber.subscribe('');
      debug(`connected sub socket to uri=${uri}`);
      resolve();
    });
  }

  notifySubscribers(evt) {
    this.subscribers.forEach(cb => cb(evt));
  }

  dispatch(evt) {
    if (!this.reqSocketConnected) {
      throw new Error('Call connect first!');
    }

    const message = {
      type: APPEND_EVENT,
      payload: evt,
    };
    debug(`Dispatching event ${JSON.stringify(message)}`);
    this.requester.send(JSON.stringify(message));
  }

  subscribe(callback) {
    if (!this.reqSocketConnected) {
      throw new Error('Call connect first!');
    }
    if (!this.subSocketConnected) {
      this.connectSubSocket(this.pubPort).then(() => {
        this.subscribers.push(callback);
        this.subSocketConnected = true;
      });
    } else {
      this.subscribers.push(callback);
    }
  }
}

module.exports = EventStore;
