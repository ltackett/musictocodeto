{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Output for playlist track
  # =============================================================================
  playlistTrackStdout = (currentTrack, playlist) ->
    # Output for Track
    stdout " "
    stdout "#{formatting.highlight('now playing:')} #{currentTrack.user.username} - #{currentTrack.title}"
    stdout " "
    events.emit('command:running', false)
    mixpanel.track("Playing", { 'type': 'from-playlist', 'playlist': playlist.permalink, 'user': currentTrack.user.permalink, 'track': currentTrack.permalink })

  # Play tracks function
  # =============================================================================
  playTracks = (currentTrack, playlist) ->
    tracks     = playlist.tracks
    player     = document.getElementById('player')
    player.src = api.streamURL(currentTrack.stream_url)

    # Play audio
    player.play()
    playlistTrackStdout(currentTrack, playlist)

    player.addEventListener("ended", (event) ->

      # Get array of tracks, and which one is playing
      tracksPlaying = tracks.map (track, index) -> track.id == currentTrack.id
      currentTrack  = tracks[tracksPlaying.indexOf(true)+1]

      # Play audio
      player.src = api.streamURL(currentTrack.stream_url)
      player.play()
      playlistTrackStdout(currentTrack, playlist)
    , false)

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
    playTracks(currentTrack, playlist)

    # End program
    events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
