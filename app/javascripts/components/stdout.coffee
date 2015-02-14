module.exports = {
  stdout: (line) ->
    target = document.getElementById('lines')
    elem   = document.createElement('li')
    text   = line

    elem.className += 'line'
    elem.innerHTML = text

    target.appendChild(elem)
}
