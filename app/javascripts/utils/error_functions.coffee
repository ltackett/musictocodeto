{stdout} = require('../components/stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  return new Object
    paramsMismatch: (cmd, params, reqParams) ->
      stdout errors.requiredParameters(cmd, params, reqParams)
      stdout " "
      events.emit('command:running', false)

    requestError: (data) ->
      stdout "#{formatting.error('error:')} #{data.errors[0].error_message}"
      stdout " "