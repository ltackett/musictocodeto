## Object Utilities
## ============================================================================

programsArray = () ->
  keys = []

  # I don't like this at all, but apparenly CoffeeScript really doesn't want
  # you to use for..in loops.
  `for (var key in programs) {
    if (programs.hasOwnProperty(key)) {
      keys.push(key);
    }
  }`

  return keys

# Global command list (initiate on load, eventually I'll store this in the session)
window.commandList =
  list: []
  position: 0

## Programs
## ============================================================================

programs=
  play: (cmd, command, params) ->
    serverCommand(cmd, command, params)

  userinfo: (cmd, command, params) ->
    serverCommand(cmd, command, params)
  
  login: (cmd, command, params) ->
    serverCommand(cmd, command, params)

  player: (cmd, command, params) ->
    if params.length > 0
      if params[0] == "play"
        soundManager.resumeAll()
      
      if params[0] == "pause"
        soundManager.pauseAll()

  help: (cmd, command, params) ->
    if params.length == 0
      stdout "For more details, run this command with the --verbose flag"
    
    stdout "&nbsp;"

    keys = programsArray()
    for key in keys
      if params[0] == "--verbose" || params[0] == "-v"
        stdout "<div class='help verbose'>#{formatCommand(key)} #{commandHelp(key, true)}</div>"
      else
        stdout "<div class='help'>#{formatCommand(key)} #{commandHelp(key)}</div>"
    
    stdout "&nbsp;"

  cd: (cmd, command, params) ->
    # Validate presence of parameters
    if params[0] == "" || params.length == 0
      stdout "#{formatError()} Missing path parameter"
      return false

    # Help flags
    if params[0] == "--help" || params[0] == "-h"
      commandHelp(command)
      return true

    # Previous directory
    if params[0] == ".." || params[0] == "../"
      previousDirectory()
      return true
    
    # Default behavior, change directory
    if params.length > 0
      changeDirectory(params[0])
  
  ls: (cmd, command, params) ->
    if params[0] == "online"
      serverCommand(cmd, command, params)
    else
      stdout "This isn't implemented yet."
  
  clear: (cmd, command, params) ->
    $("#lines ul").empty()

## Line Utilities
## ============================================================================

isCommand = (cmd, str) ->
  if cmd.search(str) == 0
    return true
  else
    return false

returnLine = (cmd) ->
  commandArray = cmd.split(/\s/)

  command = commandArray[0]
  commandArray.splice(0,1)
  params = commandArray

  console.log "command: #{command}; params: #{params}"

  returnCommand cmd, command, params

storeCommand = (cmd) ->
  commandList.list.push(cmd)
  commandList.position = commandList.list.length

readCommand = ->
  $("#cli-input").empty().append(commandList.list[commandList.position])

prevCommand = () ->
  unless commandList.position == 0
    commandList.position = commandList.position - 1
    console.log commandList.position
  readCommand()

nextCommand = () ->
  if commandList.position < commandList.list.length
    commandList.position = parseInt(commandList.position) + 1
    console.log commandList.position
  readCommand()

backspace = ($cliInput) ->
  s = $cliInput.text()
  a = s.split("")
  a.splice(-1,1)
  $cliInput.text(a.join(""))

changeDirectory = (dir) ->
  $("span.path", '#cli').append("<span class='dir'>#{dir}/</span>")

previousDirectory = () ->
  $("span.dir:last-child", "#cli").remove()

## STDIN / STDOUT
## ============================================================================

stdout = (output, indent) ->
  line = $("<li class='line'>#{output}</li>").appendTo("ul",'#lines')
  if indent
    line.wrapInner("<div class='inner'></div>")
    

  scrollBottom()
  scanlineHeight()

# Return Command
# Issue the command locally, in the client. This is always done first. It's up
# to the local program to decide if it needs to issue itself to the server.
returnCommand = (cmd, command, params) ->
  stdout formatCursor(cmd) # Echo the command in the CLI
  storeCommand(cmd)
  if typeof programs[command] == "function"
    programs[command](cmd, command, params)
  else
    stdout "#{formatError()} #{formatCommand(command)} command not found"

# Send Command
# Issues the command to the backend, for API calls and other heavy stuff.
serverCommand = (cmd, command, params) ->
  showSpinner()
  SS.server.app.serverCommand cmd, command, params

## Presentation Utilities
## ============================================================================

showSpinner = ->
  $("#spinner").show()
  $("#cli").hide()

hideSpinner = ->
  $("#spinner").hide()
  $("#cli").show()

scrollBottom = ->
  $("#container").scrollTop(parseInt($("#container").outerHeight()) + 4000)

scanlineHeight = ->
  if $("#lines").outerHeight() > (parseInt($("#container").outerHeight()) - 40)
    $("#scanlines").css
      height: parseInt($("#lines").outerHeight()) + $("#cli").outerHeight() + 20
  else
    $("#scanlines").css
      height: $("#container").outerHeight()

# Shared formatting code
formatError = (text) -> SS.shared.format.error(text)
formatCommand = (cmdName) -> SS.shared.format.command(cmdName)
formatCursor = (cmdName) -> SS.shared.format.cursor(cmdName)

## Program Utilities
## ============================================================================

changeDirectory = (dir) ->
  $("span.path", '#cli').append("<span class='dir'>#{dir}/</span>")

commandHelp = (cmd, verbose) ->
  parts = []

  # Change Directory
  # ===========================================================================
  if cmd == "cd"
    parts.push "This command helps you navigate like a boss."

  # Help
  # ===========================================================================
  if cmd == "help"
    parts.push "This command shows you all the commands currently implemented"
    
    if verbose
      parts.push '''
        <span class="flag">-v, --verbose</span>
        <span class="description">Prints all commands and flags</span>
        <br />
      '''

  # List
  # ===========================================================================
  if cmd == "ls"
    parts.push "Lists shit."

  # Player
  # ===========================================================================
  if cmd == "player"
    parts.push "The music player daemon. Runs in the background when a good man goes to war."

    if verbose
      parts.push '''
        <span class="flag">play</span>
        <span class="description">Begins playback</span>
      '''
      parts.push '''
        <span class="flag">pause</span>
        <span class="description">Pauses playback</span>
      '''
      parts.push '''
        <span class="flag">next</span>
        <span class="description">Moves to the next song in the playlist</span>
      '''
      parts.push '''
        <span class="flag">prev, previous</span>
        <span class="description">Moves to the previous song in the playlist</span>
    '''

  # Play
  # ===========================================================================
  if cmd == "play"
    parts.push "play [artist] [song] -- Play any song from SoundCloud.com"

  # Userinfo
  # ===========================================================================
  if cmd == "userinfo"
    parts.push "userinfo [artist] -- Vitals on any user on SoundCloud.com"

  # Clear
  # ===========================================================================
  if cmd == "clear"
    parts.push "... what the fuck do you think it does?"

  # Wrap it up...
  # ===========================================================================  
  if verbose then parts.push("<br />")
  return parts.join("<br />")

## Exports
## ============================================================================

exports.stdout          = (output)  -> stdout(output)
exports.changeDirectory = (dir)     -> changeDirectory(dir)
exports.commandHelp     = (cmd)     -> commandHelp(cmd)

# Bind to socket events
## ============================================================================
SS.socket.on 'disconnect', ->
  stdout("#{formatError()} Disconnected from server.")

SS.socket.on 'reconnect', ->
  stdout("#{formatCommand("[INFO]")} Reconnected to server.")
  SS.server.app.init(SS.socket.socket.sessionid)











## CLIENT INIT
## ============================================================================

# This method is called automatically when the websocket connection is established. Do not rename/delete
exports.init = ->

  # initialize server
  SS.server.app.init(SS.socket.socket.sessionid)

  ## SERVER EVENT HOOKS
  ## ==========================================================================

  SS.events.on "stdout", (text) -> stdout(text)
  SS.events.on 'changeDirectory', (dir) -> changeDirectory(dir)
  SS.events.on "previousDirectory", (dir) -> previousDirectory()
  SS.events.on "commandHelp", (cmd) -> commandHelp(cmd)
  SS.events.on "play_audio", (obj) -> mtct_play(obj)
  SS.events.on "hideSpinner", () -> hideSpinner()

  ## SoundManager
  ## ============================================================================

  window.soundIdArray = []

  soundManager.url = "/swf"
  soundManager.useFlashBlock = false # Fuck that old guard noise.

  soundManager.onready ->
    window.mtct_play = (obj) ->
      soundManager.stopAll()

      if soundIdArray.length > 0
        soundManager.destroySound(soundIdArray[0])
        soundIdArray.splice(0,1)

      if soundManager.getSoundById obj.id
        soundManager.play(obj.id)
        soundIdArray.push(obj.id)

      else
        soundManager.createSound
          id: obj.id
          url: obj.url
          autoLoad: true
          autoPlay: true
        soundIdArray.push(obj.id)

  ## Client stuff, post-init
  ## ==========================================================================

  # Spinner
  $("#spinner").each ->
    spinner = $(@)
    state = 0

    setInterval ->
      if state == 0
        spinner.text("|")
      else if state == 1
        spinner.text("/")
      else if state == 2
        spinner.text("‒")
      else if state == 3
        spinner.text("\\")

      state = state+1
      if state == 4 then state = 0
    , 50


  # Initial help info
  SS.client.app.stdout "Type <span class='command'>help</span> for a list of useful commands."

  # Event forwarding
  $(window).resize (e) ->
    scrollBottom()
    scanlineHeight()

  # blinking cursor
  setInterval ->
    $("span.cursor", "#cli").toggleClass "blink"
  , 400

  # Typing
  $(window).keypress (e) ->
    $cliInput = $("span.input", "#cli")
    $("span.cursor", "#cli").addClass "blink"

    # Pass any and all characters to the cliInput
    charCode = String.fromCharCode(e.charCode.toString())
    $cliInput.append charCode
  
  $(window).keydown (e) ->
    $cliInput = $("span.input", "#cli")
    $("span.cursor", "#cli").addClass "blink"

    console.log "keydown: #{e.which}"

    # Return
    if e.which == 13
      e.preventDefault()
      returnLine $cliInput.text()
      $cliInput.empty()

    # Backspace
    if e.which == 8
      e.preventDefault()
      backspace $cliInput

    # Space
    if e.which == 32
      e.preventDefault()
      $cliInput.append "&nbsp;"

    # Tab
    if e.which == 9
      e.preventDefault()
    
    # Up
    if e.which == 38
      e.preventDefault()
      prevCommand()

    # Down
    if e.which == 40
      e.preventDefault()
      nextCommand()