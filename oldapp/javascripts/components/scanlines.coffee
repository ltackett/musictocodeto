React = require('react')
Merge = require('merge')

{$} = require('../constants/style_constants')

module.exports = (context) ->
  React.createClass
    displayName: 'Scanlines'

    getInitialState: ->
      thinLinesOffset:  0
      thinLinesOpacity: 0
      fatLineOffset:    0
      fatLineMoving:    0

    render: ->
      <div id="scanlines">
        <div style={@thinLineStyle()}></div>
        <div style={@fatLineStyle()}></div>
      </div>


    componentDidMount: ->
      do moveThin = () =>
        randomOffset  = Math.floor(Math.random() * 6) + 1
        randomOpacity = Math.floor(Math.random() * 2) / 100

        @setState
          thinLinesOffset:  randomOffset
          thinLinesOpacity: randomOpacity

        setTimeout moveThin, 100

      do moveFat = () =>
        windowHeight = (window.outerHeight + @fatLineHeight)
        offset       = @state.fatLineOffset

        @setState { fatLineOffset: 100, fatLineMoving: 0 }
        delayed = () =>
          @setState { fatLineOffset: -50, fatLineMoving: 1 }
        setTimeout delayed, 50

        setTimeout moveFat, 6000

    thinLineStyle: ->
      if @isMounted()
        positionFixed = JSON.parse(JSON.stringify(@stylePositionFixed))

        styles = new Object
          pointerEvents: 'none'
          background:    'url(images/scanlines.png)'

        moveStyles = new Object
          backgroundPosition: "0 #{@state.thinLinesOffset}px"
          opacity:            "#{1 - @state.thinLinesOpacity}"

        return Merge(positionFixed, styles, moveStyles)

    fatLineStyle: ->
        positionFixed = JSON.parse(JSON.stringify(@stylePositionFixed))

        styles = new Object
          background: 'linear-gradient(#000000, transparent)'
          opacity:    0.08

          top:       "#{@state.fatLineOffset}%"
          bottom:    'auto'
          height:    @fatLineHeight

        animationStyles = [
          {transition: 'top 0'}
          {transition: 'top 7s linear'}
        ]



        return Merge(positionFixed, styles, animationStyles[@state.fatLineMoving])

    fatLineHeight: 200

    stylePositionFixed:
      position: 'fixed'
      top:      '0'
      bottom:   '0'
      left:     '0'
      right:    '0'
