exports.error = (text) ->
  if text == undefined
    text = "[ERR]"
  return "<span class='error'>#{text}</span>"

exports.command = (cmdName) ->
  return "<span class='command'>#{cmdName}</span>"

exports.cursor = (cmdName) ->
  return "<span class='cursor'>$></span> #{cmdName}"