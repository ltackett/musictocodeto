# Server-side Code

request = require("request")

sc =
  http:         "http://api.soundcloud.com"
  https:        "https://api.soundcloud.com"
  clientID:     "cfa2b68b053460c17008a1c1719b7c92"

stdout= (text) ->
  SS.server.app.stdout(text)
  SS.server.app.hideSpinner()
  return ""

stderr= (text, prefix) ->
  obj = {text: text, prefix: prefix}
  SS.server.app.stderr(obj)
  SS.server.app.hideSpinner()
  return ""

error=
  requiredParameters: (command, params, reqParams) -> 
    stderr "#{formatCommand(command)} requires #{reqParams} parameters, you provided #{params.length}"

play_audio= (obj) ->
  SS.server.app.play_audio(obj)
  return ""

programs=
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

  play: (cmd, command, params) ->
    reqParams = 2
    if params.length == reqParams

      # Get the track ID
      url = "#{sc.http}/resolve.json?client_id=#{sc.clientID}&url=http://soundcloud.com/#{params[0]}/#{params[1]}"
      request url, (error, response, body) ->
        if !error && response.statusCode == 200
          obj = JSON.parse body
          stdout "#{formatCommand("Now Playing:")} #{obj.user.username} - #{obj.title}"
          play_audio
            id: obj.id
            url: "#{obj.stream_url}?client_id=#{sc.clientID}"

        if error
          stdout formatError(error)
    
    else
      error.requiredParameters(command, params, reqParams)
    
  login: (cmd, command, params) ->
    reqParams = 1
    if params.length == reqParams
      url = "https://soundcloud.com/connect?"
      url = url + "client_id=#{sc.clientID}&"
      url = url + "scope=non-expiring&"
      url = url + "response_type=code&"
      url = url + "redirect_uri="
      stdout url
      console.log SS
    else
      stdout "No."
  
  ls: (cmd, command, params) ->
    if params[0] == "online"
      SS.users.online.now (data) ->
        stdout "Users currently online: #{data}"

  


# Shared formatting code
formatError = (text) -> SS.shared.format.error(text)
formatCommand = (cmdName) -> SS.shared.format.command(cmdName)
formatCursor = (cmdName) -> SS.shared.format.cursor(cmdName)

exports.actions =

  init: (sessionid, cb) ->
    console.log @session
    @session.attributes = {sessID: sessionid}
    @session.save cb

  stdout: (text, cb) ->
    SS.publish.socket(@session.attributes.sessID, 'stdout', text)
  
  stderr: (obj, cb) ->
    SS.publish.socket(@session.attributes.sessID, 'stderr', obj)
  
  play_audio: (obj, cb) ->
    SS.publish.socket(@session.attributes.sessID, 'play_audio', obj)
  
  hideSpinner: (cb) ->
    SS.publish.socket(@session.attributes.sessID, 'hideSpinner')
  
  serverCommand: (cmd, command, params, cb) ->
    if typeof programs[command] == "function"
      programs[command](cmd, command, params)
    else
      stderr "#{formatCommand(command)} was issued to the server, but no application exists on the server which matched the request."