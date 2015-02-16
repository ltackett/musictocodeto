React = require('react')

module.exports = (context) ->
  React.createClass
    displayName: 'Lines'

    render: ->
      <ul id="lines" style={@style}></ul>
