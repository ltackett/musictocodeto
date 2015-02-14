React = require('react')

module.exports = (context) ->
  React.createClass
    render: ->
      <ul id="lines" style={@style}></ul>
