{stdout} = require('../stdout')

module.exports = (context) ->
  {events} = context

  new Object
    helpText: "play [artist] [song] -- Play any song from SoundCloud.com"
    run: ->
      stdout "coming soon."
      events.emit('command:running', false)