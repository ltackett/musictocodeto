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
      request    = api.userTracks(artistSlug)

      # Request
      request.onValue (data) ->

        # Output
        if !data.errors
          localStorage.clear()
          localStorage.setItem('usertracks', JSON.stringify(data))

          stdout formatting.highlight("Track list for #{data[0].user.username}.")
          stdout " "
          data.map (track, index) ->
            stdout "#{formatting.highlight("#{index}:")} #{track.title}"

          stdout " "
          stdout "run #{formatting.highlight('play [i]')} to play a track from the list."
          stdout " "

        # Errors
        else errorFunctions.requestError(cmd, params, data)

        # End program
        events.emit('command:running', false)

      request.onError (data) ->

    # Params mismatch
    else errorFunctions.paramsMismatch(cmd, params, reqParams)

  # Return object
  # =============================================================================

  return new Object
    helpText: 'usertracks [artist-permalink] -- Get all tracks belonging to a user'

    helpTextVerbose: -> """
      #{@helpText}
      This program also populates localStorage with the list of tracks for easier playback.
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
      else getUserTracks(cmd, params)
