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
    tracks     = JSON.parse(localStorage.usertracks)
    track      = tracks[params[0]]
    player     = document.getElementById('player')
    player.src = api.streamURL(track.stream_url)

    # Play audio
    player.play()

    # Output
    stdout "#{formatting.highlight('now playing:')} #{track.user.username} - #{track.title}"
    stdout " "
    events.emit('command:running', false)
    mixpanel.track("Playing", { 'type': 'from-tracks', 'user': track.user.permalink, 'track': track.permalink })

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
