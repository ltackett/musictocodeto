{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Play from user/track permalink pair
  # =============================================================================
  reqParams = 2

  if params.length == reqParams
    userSlug  = params[0]
    trackSlug = params[1]
    request   = api.userTrack(userSlug, trackSlug)

    # Request
    request.onValue (data) ->
      if !data.errors
        player     = document.getElementById('player')
        player.src = api.streamURL(data.stream_url)

        # Play audio
        player.play()

        # Output
        stdout "#{formatting.highlight('now playing:')} #{data.user.username} - #{data.title}"
        stdout " "
        events.emit('command:running', false)

      # Errors
      else errorFunctions.requestError(data)

      # End program
      events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
