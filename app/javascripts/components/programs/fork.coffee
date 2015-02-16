shuffle  = require('lodash/collection/shuffle')
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
    helpText: 'View musictocodeto on GitHub.'

    forkMessages: [
      "fork me hard!"
      "fork me harder!"
      "could we spoon instead?"
      "fork you too, buddy!"
      "what the fork!"
      "let's talk about fork lore..."
    ]

    redirect: ->
      window.location = "http://github.com/ltackett/musictocodeto"
      events.emit('command:running', false)

    run: (params) ->
      if (params[0] == "-h" || params[0] == "--help")
        stdout @helpText

      else
        stdout ' '
        stdout formatting.highlight(shuffle(@forkMessages)[0])
        stdout formatting.error('exiting...')

        setInterval @redirect, 2000
