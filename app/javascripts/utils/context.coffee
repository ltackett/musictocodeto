{EventEmitter} = require('events')

module.exports = (config) -> {
  events: new EventEmitter()
}
