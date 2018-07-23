const defaultCreateStore = require('./create-store');
const teravozEventToAction = require('./teravoz-event-to-action');

class TeravozEventHandlerService {
  constructor({
    teravozService,
    stateStorageService,
    createStore = defaultCreateStore,
  }) {
    this.createStore = createStore;
    this.teravozService = teravozService;
    this.stateStorageService = stateStorageService;
  }

  async init() {
    if (this.stateStorageService) {
      const initialState = await this.stateStorageService.load();
      this.store = this.createStore(initialState, {
        teravozService: this.teravozService,
      });

      let previousState;
      this.unsubscribe = this.store.subscribe(() => {
        const currentState = this.store.getState();
        if (previousState !== currentState) {
          this.stateStorageService.save(currentState);
        }
        previousState = currentState;
      });
    } else {
      this.store = this.createStore();
    }
  }

  handleEvent(evt) {
    const action = teravozEventToAction(evt);
    this.store.dispatch(action);
  }

  async destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

module.exports = TeravozEventHandlerService;
