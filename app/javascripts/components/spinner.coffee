React = require('react')

module.exports = (context) ->
  React.createClass
    stages: [
      '|'
      '/'
      '‒'
      '\\'
    ]

    getInitialState: ->
      phase: 0

    render: ->
      <div id="spinner" style={@style}>{@stages[@state.phase]}</div>

    componentDidMount: ->
      do spin = () =>
        if   @state.phase == 3 then @setState {phase: 0}
        else @setState {phase: @state.phase+1}

        setTimeout(spin, 75)

    style: {
      display: 'none'
    }
