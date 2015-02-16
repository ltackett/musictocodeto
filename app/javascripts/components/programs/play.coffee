{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Play from usertracks number
  # =============================================================================
  playFromUsertracks = (cmd, params) ->
    reqParams = 1

    if params.length == reqParams
      usertracks = JSON.parse(localStorage.usertracks)
      track      = usertracks[params[0]]
      request    = api.track(track.id)

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

  # Play from user/track permalink pair
  # =============================================================================
  playFromPermalinks = (cmd, params) ->
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


  # Return object
  # =============================================================================
  return new Object
    helpText: "play [artist] [song] -- Play any song from SoundCloud.com"

    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText

      # Run program
      else
        firstParamIsNumber = !isNaN(params[0])
        hasUsertracks = (firstParamIsNumber && localStorage.usertracks)

        if hasUsertracks then playFromUsertracks(cmd, params)
        else                  playFromPermalinks(cmd, params)

