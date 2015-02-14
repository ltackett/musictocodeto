{stdout} = require('./stdout')

programs =
  play:     require('./programs/play')
  userinfo: require('./programs/userinfo')
  ls:       require('./programs/ls')
  cd:       require('./programs/cd')

  help:
    run: (params) ->
      stdout ' '

      for key in Object.keys(programs)
        if programs[key].helpText
          stdout "<span class='highlight'>#{key}</span>"
          stdout programs[key].helpText

          if params[0] == /verbose|v/ && programs[key].helpTextVerbose
            stdout programs[key].helpTextVerbose

          stdout ' '



module.exports =
  programs: programs
  programsArray: Object.keys(programs)