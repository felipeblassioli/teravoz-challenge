const fs = require('fs');
const { fromJS } = require('immutable');

class DiskStorageService {
  constructor(opts = {}) {
    this.savedStatePath = opts.savedStatePath;
  }

  /**
   * Saves the state as a json file.
   *
   * @param {ImmutableMap} state
   * @param {String} filepath
   */
  save(state, filepath) {
    filepath = filepath || this.savedStatePath;
    fs.writeFileSync(filepath, JSON.stringify(state.toJSON()));
  }

  async load(filepath) {
    filepath = filepath || this.savedStatePath;
    try {
      const state = await Promise.resolve(require(filepath));
      return fromJS(state);
    } catch (error) {
      return null;
    }
  }
}

module.exports = DiskStorageService;
