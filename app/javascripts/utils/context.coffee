module.exports = (config) ->
  api_wrapper = require("./api_wrapper")(config)
  api         = require("./api")({api_wrapper})

  {EventEmitter} = require('events')

  checkFlag = (params, flag) ->
    i = params.indexOf flag

    if i >= 0 then return true
    else           return false


  formatting =
    highlight: (text) -> "<span class='highlight'>#{text}</span>"
    error:     (text) -> "<span class='error'>#{text}</span>"

  errors =
    requiredParameters: (cmd, params, reqParams) ->
      "#{formatting.error('Error:')} #{formatting.highlight(cmd)} requires #{reqParams} parameters, you provided #{params.length}."
  
  player = soundManager

  return new Object
    events:      new EventEmitter()
    checkFlag:   checkFlag
    formatting:  formatting
    errors:      errors
    api_wrapper: api_wrapper
    api:         api
    player:      player
