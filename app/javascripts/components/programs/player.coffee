{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  # Run player commands
  # =============================================================================
  runPlayer = (cmd, params) ->
    minParams = 1
    player    = document.getElementById('player')

    if params.length >= minParams
      if params[0] == 'play'   &&  player.paused then player.play()
      if params[0] == 'pause'  && !player.paused then player.pause()
      if params[0] == 'rewind' && !player.paused then player.currentTime = 0
      if params[0] == 'skip'   && !player.paused then player.currentTime = (player.currentTime + parseFloat(params[1]))
      if params[0] == 'stop'   && !player.paused
        player.pause()
        player.currentTime = 0;

      # End program
      events.emit('command:running', false)

    # Params mismatch
    else errorFunctions.paramsMismatch(cmd, params, minParams)


  # Return object
  # =============================================================================
  return new Object
    helpText: '''
      A program to control the audio player.
    '''

    helpTextVerbose: -> """
      #{@helpText}

      #{formatting.highlight('player play')}     : plays current song if any
      #{formatting.highlight('player pause')}    : pauses playback
      #{formatting.highlight('player stop')}     : stops playback

      #{formatting.highlight('player rewind')}   : go to the start without stopping
      #{formatting.highlight('player skip [i]')} : skip forward with positive numbers, skip back with negative numbers
    """

    run: (cmd, params) ->
      helpFlag    = checkFlag(params, "-h") || checkFlag(params, "--help")
      verboseFlag = checkFlag(params, "-v") || checkFlag(params, "--verbose")

      if helpFlag
        if verboseFlag then stdout(@helpTextVerbose())
        else                stdout(@helpText)
        stdout " "

        events.emit('command:running', false)

      # Run program
      else runPlayer(cmd, params)
