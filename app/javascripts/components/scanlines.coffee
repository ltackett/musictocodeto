React = require('react')
Merge = require('merge')

{$} = require('../constants/style_constants')

module.exports = (context) ->
  React.createClass
    displayName: 'Scanlines'

    getInitialState: ->
      offsetThin: 0
      offsetFat: 0

    render: ->
      <div id="scanlines">
        <div style={@thinLineStyle()}></div>
        <div style={@fatLineStyle()}></div>
      </div>


    componentDidMount: ->
      do moveThin = () =>
        offset = @state.offsetThin
        @setState { offsetThin: offset + 1 }

        setTimeout moveThin, 20

      do moveFat = () =>
        windowHeight = (window.outerHeight + @fatLineHeight)
        offset       = @state.offsetFat

        if offset <= 0 then @setState { offsetFat: windowHeight }
        else                @setState { offsetFat: offset - 5 }

        setTimeout moveFat, 25

    thinLineStyle: ->
      if @isMounted()
        positionFixed = JSON.parse(JSON.stringify(@stylePositionFixed))

        styles = new Object
          pointerEvents: 'none'
          background:    'url(images/scanlines.png)'

        moveStyles = new Object
          backgroundPosition: "0 #{@state.offsetThin}px"

        return Merge(positionFixed, styles, moveStyles)

    fatLineStyle: ->
        positionFixed = JSON.parse(JSON.stringify(@stylePositionFixed))

        styles = new Object
          background: 'linear-gradient(#000000, transparent)'
          opacity:    0.08

          marginTop: -@fatLineHeight
          top:       @state.offsetFat
          bottom:    'auto'
          height:    @fatLineHeight


        return Merge(positionFixed, styles)

    fatLineHeight: 200

    stylePositionFixed:
      position: 'fixed'
      top:      '0'
      bottom:   '0'
      left:     '0'
      right:    '0'
