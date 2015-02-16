React  = require("react/addons")
Router = require("react-router")

{$} = require('../constants/style_constants')
{scrollToBottom} = require('../utils/scroll_to_bottom')

{RouteHandler} = Router

module.exports = (context) ->
  {events} = context

  Banner    = require('./banner')(context)
  Lines     = require('./lines')(context)
  Spinner   = require('./spinner')(context)
  Scanlines = require('./scanlines')(context)

  React.createClass
    displayName: 'Layout'

    handleClick: ->
      # Ensure the input is always focused.
      document.getElementsByTagName('input')[0].focus()

    render: ->
      <div id="MTCT" style={@mainStyle} onClick={@handleClick}>
        <Scanlines/>

        <pre>
          <Banner/>
          <Lines/>
        </pre>

        <Spinner/>
        <RouteHandler/>
      </div>

    componentDidMount: ->
      events.on 'command:running', (running) ->
        if !running then scrollToBottom()

    mainStyle:
      textShadow: $.phosphorusGlow
      color:      $.phosphorus
      background: '#0a0a0a'

      overflow: 'auto'
      position: 'absolute'
      top:      '0'
      right:    '0'
      bottom:   '0'
      left:     '0'
