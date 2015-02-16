React = require('react')

module.exports = (context) ->
  React.createClass
    displayName: 'Bang'

    getDefaultProps: ->
      text: '>'

    render: ->
      <span id="bang" style={@style}>{@props.text}</span>

    style: {
      display:       'inline-block'
      verticalAlign: 'middle'
      paddingRight:  '1ch'
    }