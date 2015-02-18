module.exports = () ->
  return new Object

    # ls - consumes `path`
    # =============================================================================
    ls: () ->
      # At load, this will be false.
      # The `cd` command will set localStorage.path
      # localStorage.path will be an array.
      # Always use the last item of the array for the `ls` path
      if localStorage.path then path = JSON.parse(localStorage.path[-1])

      # We are in the playlists directory
      if path == 'dir:playlists' then return playlistsArray

      # We are in the tracks directory
      else if path == 'dir:tracks'
        tracksArray = []
        playlistsArray.map (tracks) -> tracks.map (track) -> tracksArray.push track
        return tracksArray

      # We are in the directory of an individual playlist
      else if typeof path == 'playlist' then return path.tracks

      # We are at the root directory
      else return ['dir:playlists', 'dir:tracks']

    # cd - sets `path`
    # =============================================================================
    cd: (newPath) ->
      if localStorage.path
        path = JSON.parse(localStorage.path)
      else
        path = []

      # Going back one dir
      if newPath == ('..' || '../')
        path.pop()

      # Add new path to path array.
      # We will need to do error checking on this
      # to make sure the value of newPath exists.
      else
        path.push newPath

      # Apply to localStorage
      localStorage.setItem('path', newPath)

    # play - plays an object
    # =============================================================================
    play: (item) ->
      if item
        #    track|playlist   obj   cmd  #
        cmd("#{typeof item} #{item} play")
      else
        # act as player control

    # next - plays next object
    # =============================================================================
    next: (item) ->
      #    track|playlist   next obj   cmd  #
      cmd("#{typeof item} #{item.next} play")

    # prev - plays previous object
    # =============================================================================
    prev: (item) ->
      #    track|playlist   next obj   cmd  #
      cmd("#{typeof item} #{item.next} play")

    # player controls
    # =============================================================================
    pause: () -> # pause all players
    play:  () -> # plays current active player
    stop:  () -> # stops all players
