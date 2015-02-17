{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions          = require('../../utils/error_functions')(context)
  playFromUserTracks      = require('./play_from_user_tracks')
  playFromUserPlaylists   = require('./play_from_user_playlists')
  playFromRandomPlaylists = require('./play_from_random_playlists')
  playFromPermalinks      = require('./play_from_permalinks')


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
        firstParamIsList   = params[0] == "list"
        playRandomPlaylist =

        hasUserTracks  = (firstParamIsNumber && localStorage.usertracks)
        hasUserLists   = (firstParamIsList   && localStorage.userplaylists)
        randomPlaylist = (params[0] == "list" && params[1] == "random")

        if      hasUserTracks   then  playFromUserTracks(context, cmd, params)
        else if hasUserLists    then  playFromUserPlaylists(context, cmd, params)
        else if randomPlaylist  then  playFromRandomPlaylists(context, cmd, params)
        else                          playFromPermalinks(context, cmd, params)
