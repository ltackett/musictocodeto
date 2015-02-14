React  = require("react/addons")

module.exports =
  WormholeMixin:
    componentWillUnmount: ->
      @_unrenderLayer()
      document.getElementById(@layerSettings.parentID).removeChild @_target
      return

    componentDidUpdate: ->
      @_renderLayer()
      return

    componentDidMount: ->
      # Appending to the body is easier than managing the z-index of everything on the page.
      # It's also better for accessibility and makes stacking a snap (since components will stack
      # in mount order).
      @_target = document.createElement(@layerSettings.element)
      document.getElementById(@layerSettings.parentID).appendChild @_target
      @_renderLayer()
      return

    _renderLayer: ->
      # By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
      # creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
      # entirely different part of the page.
      React.render @renderLayer(), @_target
      return

    _unrenderLayer: ->
      React.unmountComponentAtNode @_target
      return
