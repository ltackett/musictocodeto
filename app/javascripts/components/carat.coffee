React = require('react')
Merge = require('merge')

{$} = require('../constants/style_constants')


module.exports = (context) ->
  React.createClass
    getInitialState: ->
      i: 0

    render: ->
      <span style={@style()} />

    componentDidMount: ->
      do blink = () =>
        i = @state.i
        if i == 0 then @setState {i: 1}
        else           @setState {i: 0}
        setTimeout blink, 400

    style: ->
      if @isMounted()
        styles = {
          background:    $.phosphorus
          boxShadow:     $.phosphorusGlow
          display:       'inline-block'
          verticalAlign: 'middle'
          width:         '10px'
          height:        '20px'
        }

        blinkStyles = [
          {opacity: 0, transition: 'opacity 0.4s linear'}
          {opacity: 1, transition: 'opacity 0.1s linear'}
        ]

        return Merge(styles, blinkStyles[@state.i])

