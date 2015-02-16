React  = require("react")

# Homepage markup
# =============================================================================
module.exports = (context) ->
  {events} = context

  Bang  = require('../bang')(context)
  Caret = require('../caret')(context)
  stdin = require('../stdin')(context)

  React.createClass
    displayName: 'Terminal'

    getInitialState: ->
      visible: true

    render: ->
      <div id="cli" style={@style()}>
        <Bang/>
        <stdin/>
        <Caret/>
      </div>

    componentDidMount: ->
      events.on 'command:running', (running) =>
        @setState {visible: !running}

    style: ->
      if @state.visible then {opacity: '1'}
      else                   {opacity: '0'}
