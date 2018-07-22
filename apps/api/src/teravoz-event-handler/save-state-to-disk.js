const fs = require('fs');

module.exports = function(state, filepath) {
  fs.writeFileSync(filepath, JSON.stringify(state.toJSON()));
};
