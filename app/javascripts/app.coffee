React   = require("react")
Router  = require("react-router")
context = require('./utils/context')({})
routes  = require('./routes')(context)

Router.run routes, (Handler)->
  React.render(<Handler/>, document.body)
