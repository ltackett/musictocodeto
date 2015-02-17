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

      # No track loaded in the player? Play a random-ish playlist.
      if player.src == ''
        stdout "#{formatting.error('error:')} no track loaded."
        stdout "#{formatting.highlight('Loading random-ish playlist:')}"
        stdout ' '
        events.emit('run', {cmd: 'play list random'})
        mixpanel.track("Error", { 'type': 'player:no-track', 'cmd': cmd, 'params': params.join(' ')})

      else if params[0] == 'play'   &&  player.paused then player.play()
      else if params[0] == 'pause'  && !player.paused then player.pause()
      else if params[0] == 'rewind' && !player.paused then player.currentTime = 0
      else if params[0] == 'skip'   && !player.paused then player.currentTime = (player.currentTime + parseFloat(params[1]))
      else if params[0] == 'stop'   && !player.paused
        player.pause()
        player.currentTime = 0;

      # Catch-all error
      else
        stdout "#{formatting.error('error:')} unable to process command"
        stdout ' '
        mixpanel.track("Error", { 'type': 'player:catch-all', 'cmd': cmd, 'params': params.join(' ')})

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
