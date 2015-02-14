React  = require("react/addons")
Router = require("react-router")

{$} = require('../constants/style_constants')

{RouteHandler, Link} = Router

module.exports = (context) ->

  Banner    = require('./banner')(context)
  Lines     = require('./lines')(context)
  Spinner   = require('./spinner')(context)
  ScanLines = require('./scanlines')(context)

  React.createClass
    handleClick: ->
      # Ensure the input is always focused.
      document.getElementsByTagName('input')[0].focus()

    render: ->
      <div id="MTCT" style={@mainStyle} onClick={@handleClick}>
        <ScanLines/>

        <pre>
          <Banner/>
          <Lines/>
        </pre>

        <Spinner/>
        <RouteHandler/>
      </div>

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
