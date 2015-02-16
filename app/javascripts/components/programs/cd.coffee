{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  return new Object
    helpText: 'Navigate like a boss.'

    helpTextVerbose: -> """
      #{@helpText}
      ... when I finish writing it.
      ... right now it does nothing.
    """

    run: (cmd, params) ->
      helpFlag    = checkFlag(params, "-h") || checkFlag(params, "--help")
      verboseFlag = checkFlag(params, "-v") || checkFlag(params, "--verbose")

      if helpFlag
        if verboseFlag then stdout(@helpTextVerbose())
        else                stdout(@helpText)
        stdout " "

        events.emit('command:running', false)

      else
        stdout "coming soon."
        stdout " "

        events.emit('command:running', false)