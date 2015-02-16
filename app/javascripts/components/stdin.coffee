React  = require('react/addons')

{stdout} = require('./stdout')
{scrollToBottom} = require('../utils/scroll_to_bottom')

module.exports = (context) ->
  {events, formatting} = context
  {programs} = require('./programs')(context)

  React.createClass
    displayName:  'stdin'
    inputDOMNode: false
    lineIndex:    0
    mixins:       [React.addons.LinkedStateMixin],
    keys:
      UP:    38
      DOWN:  40
      LEFT:  37
      RIGHT: 39
      ENTER: 13

    getInitialState: ->
      cmd: ''
      lines: []

    setCaretPosition: (field) ->
      caretPosition = 0

      output = () =>
        # IE Support
        if document.selection
          field.focus()                                   # Set focus on the element
          sel = document.selection.createRange()          # To get cursor position, get empty selection range
          sel.moveStart('character', -field.value.length) # Move selection start to 0 position
          caretPosition = sel.text.length                 # The caret position is selection length

        # Firefox support
        else if field.selectionStart || field.selectionStart == '0'
          caretPosition = field.selectionStart

        events.emit('caret:position', {pos: caretPosition, length: field.value.length})

      # Huh. Geting a race condition somehow.
      # Small timeout to fix.
      setTimeout output, 5

    handleCmd: (event) ->
      # Run the command on enter key
      if event.which == @keys.ENTER
        cmd         = @state.cmd
        lines       = @state.lines
        mergedLines = lines
        mergedLines.push cmd
        if @isMounted() then @setState { lines: mergedLines }

        @runCmd(cmd)
        @setState {cmd: ''}

        scrollToBottom()

      # Previous command on up arrow
      else if event.which == @keys.UP
        if @state.lines.length > 0
          if @lineIndex >= 0
            line = @state.lines[@lineIndex]
            @setState {cmd: "#{line}"}

          if @lineIndex > 0
            @lineIndex--

      # Next command on down arrow
      else if event.which == @keys.DOWN
        if @state.lines.length > 0
          if @lineIndex < @state.lines.length-1
            @lineIndex++
            line = @state.lines[@lineIndex]
            @setState {cmd: "#{line}"}

          else
            @setState {cmd: ''}

      else if (event.which == @keys.LEFT || event.which == @keys.RIGHT)
        @setCaretPosition @inputDOMNode

    handleChange: (event) ->
      @setState {cmd: event.target.value}
      @setCaretPosition @inputDOMNode


    render: ->
      <span id="stdin" ref="stdin">
        {@state.cmd}
        <input  ref="stdinInput"
                value={@state.cmd}
                onKeyDown={@handleCmd}
                onChange={@handleChange}
                style={@inputStyle} />
      </span>

    componentDidMount: ->
      @lineIndex    = @state.lines.length-1
      @inputDOMNode = @refs.stdinInput.getDOMNode()
      @inputDOMNode.focus()
      @setCaretPosition(@inputDOMNode)


    # This is the main function for running commands.
    # It splits things up into the command and its params, and
    # checks to see if a command exists by that name.
    # If it does, it runs the command.
    # If it doesn't, it returns 'command not found'.
    # =========================================================================
    runCmd: (cmd) ->
      if cmd != ""
        @lineIndex = @state.lines.length-1

      events.emit('command:running', true)
      stdout("> #{cmd}")

      # Get cmd
      cmdArray = cmd.split(/\s/)
      cmd      = cmdArray[0]

      # Get cmd params
      cmdArray.splice(0,1)
      params = cmdArray

      console.group "Command:", cmd
      console.table {params: params}
      console.groupEnd()

      # Run the program
      if typeof programs[cmd] == "object"
        programs[cmd].run(cmd, params)

      # Empty command
      else if cmd == ''
        events.emit('command:running', false)

      # Command not found
      else
        stdout "#{formatting.error('error:')} command not found #{formatting.highlight(cmd)}"
        events.emit('command:running', false)

        # Add blankline
        stdout " "


    inputStyle:
      position: 'fixed'
      opacity:  0
      bottom:   0
      right:    0