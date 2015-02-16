{EventEmitter} = require('events')

checkFlag = (params, flag) ->
  i = params.indexOf flag

  if i >= 0 then return true
  else           return false

formatting =
  highlight: (text) -> "<span class='highlight'>#{text}</span>"
  error:     (text) -> "<span class='error'>#{text}</span>"

module.exports = (config) -> {
  events:    new EventEmitter()
  checkFlag: checkFlag
  formatting:  formatting
}
