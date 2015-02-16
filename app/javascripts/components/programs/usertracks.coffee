{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Get user's tracks from permalink
  # =============================================================================
  getUserTracks = (cmd, params) ->
    reqParams = 1

    if params.length == reqParams
      artistSlug = params[0]
      request    = api.usertracks(artistSlug)

      # Request
      request.onValue (data) ->

        # Output
        if !data.errors
          trackLinks = data.map (track) ->
            return new Object
              username: track.user.username
              id: track.id

          localStorage.clear()
          localStorage.setItem('usertracks', JSON.stringify(trackLinks))

          stdout " "
          data.map (track, index) ->
            stdout "#{formatting.highlight("#{index}:")} #{track.title}"

          stdout " "
          stdout "run `play [number]` to play a track from the list."
          stdout " "

        # Errors
        else errorFunctions.requestError(data)

        # End program
        events.emit('command:running', false)

      request.onError (data) ->

    # Params mismatch
    else errorFunctions.paramsMismatch(cmd, params, reqParams)

  # Return object
  # =============================================================================

  return new Object
    helpText: 'usertracks [artist-permalink] -- Get all tracks belonging to an user'
    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText
        stdout " "

        events.emit('command:running', false)

      # Run program
      else getUserTracks(cmd, params)
