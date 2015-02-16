{stdout} = require('./stdout')


module.exports = (context) -> {
  programs:
    play:     require('./programs/play')(context)
    userinfo: require('./programs/userinfo')(context)
    ls:       require('./programs/ls')(context)
    cd:       require('./programs/cd')(context)

    help:
      run: (params) ->
        stdout ' '

        for key in Object.keys(programs)
          if programs[key].helpText
            stdout "<span class='highlight'>#{key}</span>"
            stdout programs[key].helpText

            console.log params
            if (params[0] == "-v" || params[0] == "--verbose") && programs[key].helpTextVerbose
              stdout ' '
              stdout programs[key].helpTextVerbose

            stdout ' '
            events.emit('command:running', false)
}
