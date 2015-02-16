React = require('react')

module.exports = (context) ->
  {events} = context

  React.createClass
    stages: [
      '|'
      '/'
      '‒'
      '\\'
    ]

    getInitialState: ->
      visible: false
      phase:   0

    render: ->
      <div id="spinner" style={@style()}>{@stages[@state.phase]}</div>

    componentDidMount: ->
      events.on 'command:running', (running) =>
        @setState {visible: running}

      do spin = () =>
        if   @state.phase == 3 then @setState {phase: 0}
        else @setState {phase: @state.phase+1}

        setTimeout(spin, 75)

    style: ->
      if @state.visible then {display: 'block'}
      else                   {display: 'none'}
