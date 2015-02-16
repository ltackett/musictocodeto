{stdout} = require('../stdout')

module.exports = (context) ->
  {events, formatting, errors, api} = context

  new Object
    helpText: "play [artist] [song] -- Play any song from SoundCloud.com"

    run: (cmd, params) ->
      firstParamIsNumber = !isNaN(params[0])

      if firstParamIsNumber && localStorage.usertracks
        reqParams = 1

        if params.length == reqParams
          usertracks = JSON.parse(localStorage.usertracks)
          track      = usertracks[params[0]]
          request    = api.play(track.id)

          request.onValue (data) ->
            player     = document.getElementById('player')
            player.src = api.streamURL(data.stream_url)
            player.play()

            stdout "#{formatting.highlight('now playing:')} #{track.username} - #{data.title}"
            events.emit('command:running', false)

        else
          stdout errors.requiredParameters(cmd, params, reqParams)
          stdout " "
          events.emit('command:running', false)

      else
        reqParams = 2

        if params.length == reqParams
          stdout "coming soon."
          events.emit('command:running', false)

        else
          stdout errors.requiredParameters(cmd, params, reqParams)
          stdout " "
          events.emit('command:running', false)