React = require('react')
Merge = require('merge')

module.exports = (context) ->
  React.createClass
    displayName: 'Scanlines'

    getInitialState: ->
      offset: 0

    render: ->
      <div id="scanlines" style={@style()} />

    componentDidMount: ->
      do move = () =>
        offset = @state.offset
        @setState { offset: offset - 1 }

        setTimeout move, 150


    style: ->
      if @isMounted()
        styles = {
          pointerEvents: 'none'

          background: 'url(/images/scanlines.png)'
          position:   'fixed'
          top:        '0'
          bottom:     '0'
          left:       '0'
          right:      '0'
        }

        moveStyles = {
          backgroundPosition: "0 #{@state.offset}px"
        }

        return Merge(styles, moveStyles)