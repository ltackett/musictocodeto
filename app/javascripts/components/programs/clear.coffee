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
      Clears the screen
    '''

    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText
        stdout " "

        events.emit('command:running', false)

      else
        line = document.getElementById('lines')
        line.innerHTML = ''

        events.emit('command:running', false)