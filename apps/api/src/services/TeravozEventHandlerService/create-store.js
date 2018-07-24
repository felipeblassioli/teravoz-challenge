const { createStore, applyMiddleware } = require('redux');
const { createLogicMiddleware } = require('redux-logic');
const { reducer: rootReducer } = require('./reducer');
const logic = require('./logic');

module.exports = function({ initialState, deps = {} }) {
  if (initialState === null) {
    initialState = undefined;
  }

  const logicMiddleware = createLogicMiddleware(logic, deps);

  const middleware = applyMiddleware(logicMiddleware);

  const enhancer = middleware;

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};
