{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions   = require('../../utils/error_functions')(context)
  {playlistPlayer} = require('./playlist_player')(context, cmd, params)

  # Play from user/track permalink pair
  # =============================================================================
  reqParams = 2

  if params.length == reqParams
    playlists    = JSON.parse(localStorage.userplaylists)
    playlist     = playlists[params[1]]
    tracks       = playlist.tracks
    currentTrack = tracks[0]

    # Set usertracks to playlist tracks
    localStorage.clear()
    localStorage.setItem('usertracks', JSON.stringify(tracks))

    # Output for Playlist
    stdout formatting.highlight("Track list for #{playlist.user.username}'s playlist: #{playlist.title}.")
    stdout " "
    tracks.map (track, index) ->
      stdout "#{formatting.highlight("#{index}:")} #{track.title}"

    # Play tracks
    playlistPlayer(currentTrack, playlist)

    # End program
    events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
