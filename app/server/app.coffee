# Server-side Code

request = require("request")

soundcloudApiKey = "htuiRd1JP11Ww0X72T1C3g"

Object.prototype.keys = (obj) ->
  keys = []
  for key in obj
    keys.push(key)
  
  return keys

stdout= (text) ->
  SS.server.app.stdout(text)
  return ""

play_audio= (obj) ->
  SS.server.app.play_audio(obj)
  return ""


programs=
  userinfo: (cmd, command, params) ->
    url = "http://api.soundcloud.com/users/#{params[0]}.json?client_id=#{soundcloudApiKey}"
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
        stdout formatError(error)

  play: (cmd, command, params) ->
    reqParams = 2
    if params[0] && params[1]

      # Get the track ID
      url = "http://api.soundcloud.com/resolve.json?client_id=#{soundcloudApiKey}&url=http://soundcloud.com/#{params[0]}/#{params[1]}"
      request url, (error, response, body) ->
        if !error && response.statusCode == 200
          obj = JSON.parse body
          stdout "#{formatCommand("Now Playing:")} #{obj.user.username} - #{obj.title}"
          play_audio
            id: obj.id
            url: "#{obj.stream_url}?client_id=#{soundcloudApiKey}"

        if error
          stdout formatError(error)
    
    else
      stdout "#{formatError()} #{formatCommand(command)} requires #{reqParams} parameters, you provided #{params.length}"
  


# Shared formatting code
formatError = (text) -> SS.shared.format.error(text)
formatCommand = (cmdName) -> SS.shared.format.command(cmdName)
formatCursor = (cmdName) -> SS.shared.format.cursor(cmdName)

exports.actions =

  init: (sessionid, cb) ->
    console.log @session
    @session.attributes = {sessID: sessionid}
    @session.save cb

  stdout: (text, cp) ->
    SS.publish.socket(@session.attributes.sessID, 'stdout', text)
  
  play_audio: (obj, cb) ->
    SS.publish.socket(@session.attributes.sessID, 'play_audio', obj)
  
  serverCommand: (cmd, command, params, cb) ->
    if typeof programs[command] == "function"
      programs[command](cmd, command, params)
    else
      stdout "#{formatError()} #{formatCommand(command)} was issued to the server, but no application exists on the server which matched the request."