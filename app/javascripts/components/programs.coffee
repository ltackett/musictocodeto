module.exports = (context) ->
  {stdout} = require('./stdout')
  {events,checkFlag,formatting} = context


  programs =
    play:       require('./programs/play')(context)
    userinfo:   require('./programs/userinfo')(context)
    usertracks: require('./programs/usertracks')(context)
    ls:         require('./programs/ls')(context)
    cd:         require('./programs/cd')(context)
    fork:       require('./programs/fork')(context)

    help:
      helpText: '''
        Displays a list of all programs and help information for each.

        -v, --verbose : Displays additional help information per program.
      '''

      helpTextVerbose: -> """
        #{@helpText}
        Programs also accept -h or --help flags to display their help text
      """

      run: (cmd, params) ->
        verboseFlag = checkFlag(params, "-v") || checkFlag(params, "--verbose")
        keys        = Object.keys(programs)

        stdout ' '


        for key in keys
          if programs[key].helpText
            stdout '--------------------------------------------------------------------------------'
            stdout formatting.highlight(key)

            if verboseFlag && programs[key].helpTextVerbose
              stdout programs[key].helpTextVerbose()
            else
              stdout programs[key].helpText

            # Are we the last key in the array?
            if key == keys[keys.length-1]
              stdout '--------------------------------------------------------------------------------'

            events.emit('command:running', false)

  return new Object
    programs: programs
