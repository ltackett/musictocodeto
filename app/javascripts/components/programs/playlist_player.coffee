{stdout} = require('../stdout')

module.exports = (context, cmd, params) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  # Output for playlist track
  # =============================================================================
  playlistTrackStdout = (currentTrack, playlist) ->
    # Output for Track
    stdout " "
    stdout "#{formatting.highlight('now playing:')} #{currentTrack.user.username} - #{currentTrack.title}"
    stdout " "
    events.emit('command:running', false)
    mixpanel.track("Playing", { 'type': 'from-playlist', 'playlist': playlist.permalink, 'user': currentTrack.user.permalink, 'track': currentTrack.permalink })

  return new Object
    playlistPlayer: (currentTrack, playlist) ->
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
        console.log currentTrack
        if currentTrack
          player.src = api.streamURL(currentTrack.stream_url)
          player.play()
          playlistTrackStdout(currentTrack, playlist)

        else
          stdout "#{formatting.error('error:')} out of tracks."
          stdout "#{formatting.highlight('Loading random-ish playlist:')}"
          stdout ' '
          events.emit('run', {cmd: 'play list random'})
          mixpanel.track("Error", { 'type': 'playlist:out-of-tracks', 'cmd': cmd, 'params': params.join(' ')})

      , false)