React  = require('react/addons')


{stdout} = require('./stdout')
{scrollToBottom} = require('../utils/scroll_to_bottom')
{programs, programsArray} = require('./programs')

module.exports = (context) ->
  React.createClass
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: ->
      cmd: ''
      lines: []

    handleCmd: (event) ->
      if event.which==13
        cmd         = @state.cmd
        lines       = @state.lines
        mergedLines = lines
        mergedLines.push cmd
        if @isMounted() then @setState { lines: mergedLines }

        @runCmd(cmd)
        @setState {cmd: ''}

        scrollToBottom()

    renderLines: ->

    render: ->
      <span id="stdin" ref="stdin">
        {@state.cmd}
        <input ref="stdinInput" valueLink={@linkState('cmd')} onKeyDown={@handleCmd} />
      </span>

    componentDidMount: ->
      @refs.stdinInput.getDOMNode().focus()


    # This is the main function for running commands.
    # It splits things up into the command and its params, and
    # checks to see if a command exists by that name.
    # If it does, it runs the command.
    # If it doesn't, it returns 'command not found'.
    # =========================================================================
    runCmd: (cmd) ->
      stdout("> #{cmd}")

      # Get cmd
      cmdArray = cmd.split(/\s/)
      cmd      = cmdArray[0]

      # Get cmd params
      cmdArray.splice(0,1)
      params = cmdArray

      # Run the program
      if typeof programs[cmd] == "object"
        programs[cmd].run(params)

      # Command not found
      else stdout "<span class='error'>command not found:</span> #{cmd}"

      # Add blankline
      stdout " "