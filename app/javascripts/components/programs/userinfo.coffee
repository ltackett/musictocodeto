{stdout} = require('../stdout')

module.exports = (context) ->
  {events} = context

  new Object
    helpText: 'userinfo [artist] -- Get vitals on any user on SoundCloud.com'
    run: (cmd, params) ->
      output = ->
        stdout "coming soon."
        events.emit('command:running', false)

      setTimeout output, 500

###
  userinfo: (cmd, command, params) ->
    reqParams = 1
    if params.length == reqParams
      url = "#{sc.http}/users/#{params[0]}.json?client_id=#{sc.clientID}"
      request url, (error, response, body) ->
        if !error && response.statusCode == 200
          obj = JSON.parse body
          stdout "#{formatCommand("id:")} #{obj.id}"
          stdout "#{formatCommand("username:")} #{obj.username}"
          stdout "#{formatCommand("full_name:")} #{obj.full_name}"
          stdout "#{formatCommand("city:")} #{obj.city}"
          stdout "#{formatCommand("description:")} #{obj.description}"
          stdout "&nbsp;"

        if error
          stderr error

    else
      error.requiredParameters(command, params, reqParams)
###