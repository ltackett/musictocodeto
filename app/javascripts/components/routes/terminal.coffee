React  = require("react")

# Homepage markup
# =============================================================================
module.exports = (context) ->

  Bang  = require('../bang')(context)
  Carat = require('../carat')(context)
  STDIN = require('../stdin')(context)

  React.createClass
    render: ->
      <div id="cli">
        <Bang/>
        <STDIN/>
        <Carat/>
      </div>
