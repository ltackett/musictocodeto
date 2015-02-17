{stdout} = require('./stdout')


module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  mainHelpText = () -> stdout """
  Basic usage:

  Getting a list of tracks from a user, and playing back a track
  --------------------------------------------------------------------------------
  > #{formatting.highlight('usertracks [artist_slug]')} — eg. the user permalink #{formatting.highlight('daze-of-resistance')} would be my #{formatting.highlight('artist_slug')}
  > #{formatting.highlight('play [i]')} — you will receive a list of track from the #{formatting.highlight('usertracks')} program. #{formatting.highlight('play 0')} will play the first track from the list. Right now it only loads the first 50 tracks. Paging will come in a future version.

  Getting a playlist from a user, and playing all tracks
  --------------------------------------------------------------------------------
  > #{formatting.highlight('userplaylists [artist_slug]')} — similar to #{formatting.highlight('usertracks')}, this accepts a user permalink and returns a list of playlists.
  > #{formatting.highlight('play list [i]')} — similar to playing a track, this will playback a playlist.
  > #{formatting.highlight('play [i]')} — loading the playlist also loads it's songs into the current context, so you can skip to any song in the list just as you would running #{formatting.highlight('play [i]')} after loading tracks from #{formatting.highlight('usertracks')}... though currently this stops the playlist from playing sequentially. I will fix that soon.

  Player actions while audio is loaded
  --------------------------------------------------------------------------------
  > #{formatting.highlight('player play')}
  > #{formatting.highlight('player pause')}
  > #{formatting.highlight('player stop')}
  > #{formatting.highlight('player rewind')}
  > #{formatting.highlight('player skip [n]')} — a positive or negative integer will skip through the audio by that many seconds.

  This is a work-in-progress, so there are bound to be bugs. Hit me up on github issues and I'll try to tackle them as they come.
  Thanks for checking out my ridiculous little project!
  —Lorin
  """

  # Programs
  # =============================================================================
  programs =
    userinfo:      require('./programs/userinfo')(context)
    usertracks:    require('./programs/usertracks')(context)
    userplaylists: require('./programs/userplaylists')(context)
    play:          require('./programs/play')(context)
    player:        require('./programs/player')(context)
    ls:            require('./programs/ls')(context)
    cd:            require('./programs/cd')(context)
    clear:         require('./programs/clear')(context)
    about:         require('./programs/about')(context)
    fork:          require('./programs/fork')(context)

    # Help Program
    # =============================================================================
    help:
      helpText: '''
        -v, --verbose : Displays additional help information per program.
      '''

      helpTextVerbose: -> """
        #{@helpText}
        Programs also accept -h or --help flags to display their help text
      """

      run: (cmd, params) ->
        verboseFlag = checkFlag(params, "-v") || checkFlag(params, "--verbose")
        keys        = Object.keys(programs)

        for key in keys
          if programs[key].helpText
            stdout ' '
            stdout '--------------------------------------------------------------------------------'
            stdout ' '
            stdout formatting.highlight(key)

            if verboseFlag && programs[key].helpTextVerbose
              stdout programs[key].helpTextVerbose()
            else
              stdout programs[key].helpText

            # Are we the last key in the array?
            if key == keys[keys.length-1]
              stdout ' '
              stdout '--------------------------------------------------------------------------------'
              stdout ' '

        mainHelpText()
        stdout ' '

        events.emit('command:running', false)

  # Return object
  # =============================================================================
  return new Object
    programs: programs
