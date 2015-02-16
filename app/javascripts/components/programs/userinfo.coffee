{stdout} = require('../stdout')

module.exports = (context) ->
  { api
    checkFlag
    events
    errors
    formatting
  } = context

  errorFunctions = require('../../utils/error_functions')(context)

  # Get userinfo from permalink
  # =============================================================================
  getUserInfo = (cmd, params) ->
    reqParams = 1

    if params.length == reqParams
      artistSlug = params[0]
      request    = api.userinfo(artistSlug)

      # Request
      request.onValue (data) ->

        # Output
        if !data.errors
          stdout " "
          stdout "#{formatting.highlight("id:")}          #{data.id}"
          stdout "#{formatting.highlight("username:")}    #{data.username}"
          stdout "#{formatting.highlight("full_name:")}   #{data.full_name}"
          stdout "#{formatting.highlight("city:")}        #{data.city}"
          stdout "#{formatting.highlight("description:")} #{data.description}"
          stdout " "

        # Errors
        else errorFunctions.requestError(data)

        # End program
        events.emit('command:running', false)

    # Params mismatch
    else errorFunctions.paramsMismatch(cmd, params, reqParams)


  # Return object
  # =============================================================================
  return new Object
    helpText: 'userinfo [artist-permalink] -- Get vitals on any user on SoundCloud.com'

    run: (cmd, params) ->
      helpFlag = checkFlag(params, "-h") || checkFlag(params, "--help")

      if helpFlag
        stdout @helpText
        stdout " "

        events.emit('command:running', false)

      # Run program
      else getUserInfo(cmd, params)
