const { fromJS } = require('immutable');

module.exports = async function(filepath) {
  try {
    const state = await Promise.resolve(require(filepath));
    return fromJS(state);
  } catch (error) {
    return null;
  }
};
