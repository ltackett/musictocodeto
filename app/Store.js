var flux    = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  lines: [],
  actions: [
    actions.STDOUT
  ],

  STDOUT: function (message) {
    this.lines.push(message);
    this.emitChange();
  },

  exports: {
    getLines: function () {
      return this.lines;
    }
  }
});
