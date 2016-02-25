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
      mixpanel.track("Error", { 'type': 'params-mismatch', 'cmd': cmd, 'params': params.join(' '), 'reqParams': reqParams })

    requestError: (cmd, params, data) ->
      stdout "#{formatting.error('error:')} #{data.errors[0].error_message}"
      stdout " "
      events.emit('command:running', false)
      mixpanel.track("Error", { 'type': 'request-error', 'cmd': cmd, 'params': params.join(' '), 'error-message': data.errors[0].error_message })