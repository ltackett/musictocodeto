shuffle  = require('lodash/collection/shuffle')
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
    playlistSeeds = [
      {user: 'musictocodeto',             playlist: 'mtct-stack-overflow-02-2015'}
      {user: 'musictocodeto',             playlist: 'mtct-mellow-02-2015'}
      {user: 'eddy-lerner',               playlist: 'music-to-code-to'}
      {user: 'plyturon',                  playlist: 'programming-music'}
      {user: 'attilam',                   playlist: 'music-for-programming-1'}
      {user: 'conversemusic',             playlist: 'converse-rubber-tracks-sample'}
      {user: 'niraj-chauhan-2',           playlist: 'coding-programming'}
      {user: 'tim_go',                    playlist: 'atmospheric'}
      {user: 'loscil',                    playlist: 'loscil'}
      {user: 'electronicvoicephenomena',  playlist: 'analog-morphology-ii-1'}
    ]
    rp = shuffle(playlistSeeds)[0]

    # Hm. Another race condition. I should look into this.
    # Probably doing something stupid.
    setRunning = () -> events.emit('command:running', true)
    setTimeout setRunning, 5

    console.log rp

    request = api.userPlaylist(rp.user, rp.playlist)
    request.onValue (data) ->
      if !data.errors
        playlist      = data
        tracks        = playlist.tracks
        currentTrack  = tracks[0]

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

      # Errors
      else errorFunctions.requestError(cmd, params, data)

      # End program
      events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
