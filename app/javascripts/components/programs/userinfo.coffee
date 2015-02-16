{stdout} = require('../stdout')

module.exports = (context) ->
  {events} = context

  new Object
    helpText: 'userinfo [artist] -- Get vitals on any user on SoundCloud.com'
    run: ->
      output = ->
        stdout "coming soon."
        events.emit('command:running', false)

      setTimeout output, 500
