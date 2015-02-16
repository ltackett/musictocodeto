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
      About MTCT
    '''

    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText
        stdout " "

        events.emit('command:running', false)

      else
        stdout '--------------------------------------------------------------------------------'
        stdout " "
        stdout """
          #{formatting.highlight('MTCT')} was created by #{formatting.highlight('Lorin Tackett.')}
          It is powered by #{formatting.highlight('React.')}

          It's not particularly useful, but it was fun to build.
          This is my I-want-to-play-with-new-technology project.
          Previously, it has been powered by Angular, Ember, SocketStream, Backbone, and Rails.
        """
        stdout " "
        stdout '--------------------------------------------------------------------------------'
        stdout " "

        events.emit('command:running', false)