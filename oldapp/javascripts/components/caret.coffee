React = require('react')
Merge = require('merge')

{$} = require('../constants/style_constants')


module.exports = (context) ->
  {events} = context

  React.createClass
    displayName: 'Carat'

    getInitialState: ->
      i: 0

    render: ->
      <span style={@style()} />

    componentDidMount: ->
      events.on 'caret:position', (data) =>
        offset = data.length - data.pos
        @setState {caretOffset: offset}

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

        positionStyles = {
          transform: "translate(-#{@state.caretOffset}ch, 0)"
        }

        blinkStyles = [
          {opacity: 0, transition: 'opacity 0.4s linear'}
          {opacity: 1, transition: 'opacity 0.1s linear'}
        ]

        return Merge(styles, positionStyles, blinkStyles[@state.i])

