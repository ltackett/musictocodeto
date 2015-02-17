{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Play tracks function
  # =============================================================================
  playTracks = (currentTrack, playlist) ->
    tracks = playlist.tracks
    player = document.getElementById('player')

    # Play audio
    player.src = api.streamURL(currentTrack.stream_url)
    player.play()
    player.addEventListener("ended", (event) ->

      # Get array of tracks, and which one is playing
      tracksPlaying = tracks.map (track, index) -> track.id == currentTrack.id
      currentTrack = tracks[tracksPlaying.indexOf(true)+1]

      # Play audio
      player.src = api.streamURL(currentTrack.stream_url)
      player.play()

      # Output for Track
      stdout "#{formatting.highlight('now playing:')} #{currentTrack.user.username} - #{currentTrack.title}"
      stdout " "
      events.emit('command:running', false)
      mixpanel.track("Playing", { 'type': 'from-playlist', 'playlist': playlist.permalink, 'user': currentTrack.user.permalink, 'track': currentTrack.permalink })
    , false)

  # Play from user/track permalink pair
  # =============================================================================
  reqParams = 2

  if params.length == reqParams
    playlists = JSON.parse(localStorage.userplaylists)
    playlist  = playlists[params[1]]
    request   = api.playlist(playlist.id)

    # Request
    request.onValue (data) ->
      if !data.errors
        currentTrack = data.tracks[0]

        # Build track IDs
        tracks = data.tracks

        # Set usertracks to playlist tracks
        localStorage.clear()
        localStorage.setItem('usertracks', JSON.stringify(tracks))

        # Output for Playlist
        stdout formatting.highlight("Track list for #{data.user.username}'s playlist: #{data.title}.")
        stdout " "
        data.tracks.map (track, index) ->
          stdout "#{formatting.highlight("#{index}:")} #{track.title}"

        # Play tracks
        playTracks(currentTrack, data)

        # Output for Track
        stdout " "
        stdout "#{formatting.highlight('now playing:')} #{currentTrack.user.username} - #{currentTrack.title}"
        stdout " "
        events.emit('command:running', false)
        mixpanel.track("Playing", { 'type': 'from-playlist', 'playlist': data.permalink, 'user': currentTrack.user.permalink, 'track': currentTrack.permalink })

      # Errors
      else errorFunctions.requestError(cmd, params, data)

      # End program
      events.emit('command:running', false)

  # Params mismatch
  else errorFunctions.paramsMismatch(cmd, params, reqParams)
