{stdout} = require('../stdout')

module.exports = (context) ->
  {events} = context

  new Object
    helpText: '''
      lists shit.
    '''

    run: ->
      stdout "You ran the ls program. Good job!"
      events.emit('command:running', false)