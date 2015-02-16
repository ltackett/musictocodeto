Qajax = require('qajax')

{stdout} = require('../stdout')

module.exports = (context) ->
  {events, errors, formatting, api} = context

  new Object
    helpText: 'usertracks [artist] -- Get all tracks belonging to an user'
    run: (cmd, params) ->
      reqParams = 1

      if params.length == reqParams
        artistSlug = params[0]
        request    = api.usertracks(artistSlug)

        request.onValue (data) ->
          console.log data
          if !data.errors
            trackLinks = data.map (track) ->
              return new Object
                username: track.user.username
                id: track.id

            localStorage.clear()
            localStorage.setItem('usertracks', JSON.stringify(trackLinks))

            stdout " "
            data.map (track, index) ->
              stdout "#{formatting.highlight("#{index}:")} #{track.title}"

            stdout " "
            stdout "run `play [number]` to play a track from the list."
            stdout " "

          else
            stdout "#{formatting.error('error:')} #{data.errors[0].error_message}"
            stdout " "

          events.emit('command:running', false)

        request.onError (data) ->

      else
        stdout errors.requiredParameters(cmd, params, reqParams)
        stdout " "
        events.emit('command:running', false)
