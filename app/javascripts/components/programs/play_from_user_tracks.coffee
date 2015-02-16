{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Play from usertracks number
  # =============================================================================
  reqParams = 1

  if params.length == reqParams
    tracks  = JSON.parse(localStorage.usertracks)
    track   = tracks[params[0]]
    request = api.track(track.id)

    # Request
    request.onValue (data) ->
      if !data.errors
        player     = document.getElementById('player')
        player.src = api.streamURL(data.stream_url)

        # Play audio
        player.play()

        # Output
        stdout "#{formatting.highlight('now playing:')} #{track.username} - #{data.title}"
        stdout " "
        events.emit('command:running', false)

      # Errors
      else errorFunctions.requestError(data)

      # End program
      events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
