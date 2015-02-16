{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  # Return object
  # =============================================================================
  return new Object
    helpText: '''
      lists of things.
    '''

    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText
        stdout " "

        events.emit('command:running', false)

      else
        stdout "coming soon"
        stdout " "

        events.emit('command:running', false)