{stdout} = require('../stdout')

module.exports = (context) ->
  {events} = context

  new Object
    helpText: 'This command helps you navigate like a boss.'

    helpTextVerbose: -> """
      #{@helpText}
      ... or at least it will, when I finish writing it.
      ... right now it does nothing.
    """

    run: (params) ->
      if (params[0] == "-h" || params[0] == "--help")
        stdout @helpText

      else
        stdout "coming soon."

      events.emit('command:running', false)