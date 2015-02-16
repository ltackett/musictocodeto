{stdout} = require('./stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

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

            events.emit('command:running', false)

  # Return object
  # =============================================================================
  return new Object
    programs: programs
