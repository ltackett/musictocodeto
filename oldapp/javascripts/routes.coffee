React  = require("react")
Router = require("react-router")

{Routes, Route, DefaultRoute, Link, Redirect} = Router

module.exports = (context) ->
  Layout   = require('./components/layout')(context)
  Terminal = require('./components/routes/terminal')(context)

  <Route name="mtct" path="/" handler={Layout}>
    <DefaultRoute handler={Terminal}/>
  </Route>
