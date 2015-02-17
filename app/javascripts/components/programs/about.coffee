{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  aboutText = () ->

    """
    --------------------------------------------------------------------------------

    #{formatting.highlight('MTCT')} was created by #{formatting.highlight('Lorin Tackett.')}
    It is powered by #{formatting.highlight('React.')}

    musictocodeto started out in 2010 as a bunch of playlists on playlists.com.
    I've repurposed it for music discovery. Use MTCT to play an endless stream of
    random-ish curated playlists from SoundCloud.

    Right now there aren't very many playlists, but I'll be adding lots soon.

    Got a ton of stuff planned. Stay tuned.
    —Lorin

    --------------------------------------------------------------------------------
    """

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
        stdout ' '
        stdout aboutText()
        stdout ' '
        events.emit('command:running', false)