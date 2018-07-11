import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import runCommand from './runCommand';

import {
  stdout,
  stdoutMultiline,

  addToCmdHistory,
  setCmdHistoryIndex,
  incrementCmdHistoryIndex,
  decrementCmdHistoryIndex,

  startCmd,
  stopCmd,
} from '../modules/stdout'

import Bang from './Bang';
import Caret from './Caret';
import Spinner from './Spinner';

const keys = {
  UP:    38,
  DOWN:  40,
  LEFT:  37,
  RIGHT: 39,
  ENTER: 13,
};

const R = React.Fragment

class CommandLine extends Component {
  state = {
    bang: '>',
    cmd: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cmdHistoryIndex !== this.props.cmdHistoryIndex) {
      this.valueFromHistory();
    }
  }

  // ==========================================================================
  // handleCommand
  // This is the function that makes the whole thing chooch.
  //
  // First, it splits the command string into a command object with:
  //   cmd:     the original, unmodified string
  //   program: a string with the command name
  //   params:  an array containing any parameters
  //
  // Then runs the program you entered, feeding the parameters to it.
  //
  // There is some basic error handling, but for the most part, it expects that
  // the program itself will handle any line output, input interruptions, etc.
  //
  // The only thing a program needs to do is reject or resolve.
  // ==========================================================================

  handleCommand = (cmd) => {
    const cmdObject = {
      cmd: cmd,
      program: cmd.split(/\s/)[0],
      params: cmd.split(/\s/).slice(1),
    };

    // Echo the command
    this.props.stdout(`${this.state.bang} ${cmd}`);

    // Run the command
    this.props.startCmd();
    runCommand(cmdObject)
      .then(data => {
        this.props.stopCmd();
        if (data.lines) { this.props.stdoutMultiline(data.lines); }
        if (cmdObject.cmd !== '') { this.props.stdout('') }
        this.scrollToBottom();

        // If an action is passed back from the program, run it
        // if (data.action) { this.runAction(data.action) }
      })

      // Catch errors
      .catch(data => {
        this.props.stopCmd();
        if (data.error) { this.props.stdout(<R><em className="err">Error:</em> {data.error}</R>) }
        if (data.lines) { this.props.stdoutMultiline(data.lines); }
        if (cmdObject.cmd !== '') { this.props.stdout('') }
        this.scrollToBottom();
      })

    // Add command to history
    this.props.addToCmdHistory(cmdObject);

    // Reset historyIndex
    this.props.setCmdHistoryIndex(0);
  }

  // ==========================================================================

  handleSubmit = (event) => {
    event.preventDefault();

    const { cmd } = event.target;
    this.handleCommand(cmd.value);
    this.setState({ cmd: '' });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleKeyPressed = (event) => {
    if (event.keyCode === keys.UP) { this.handleCurseThroughHistory('decrement'); }
    if (event.keyCode === keys.DOWN) { this.handleCurseThroughHistory('increment'); }
  }

  handleCurseThroughHistory(direction) {
    const { cmdHistory, cmdHistoryIndex } = this.props;

    // historyIndex is a count-backwards-from-zero index, so these boundaries
    // read kinda backwards. It's mathematically correct, however. Since the
    // lower limit is a negative number, and the upper limit is 0.
    const lowerLimit = (cmdHistoryIndex + 1) >= -(cmdHistory.length);
    const upperLimit = (cmdHistoryIndex - 1) <= 0;

    // Curse through history, within lower and upper limits
    if (direction === 'decrement' && lowerLimit) { this.props.decrementCmdHistoryIndex() }
    if (direction === 'increment' && upperLimit) { this.props.incrementCmdHistoryIndex() }
  }

  valueFromHistory = () => {
    const { cmdHistory, cmdHistoryIndex } = this.props

    if (cmdHistoryIndex === 0) {
      this.setState({ cmd: '' });
    } else {
      const value = cmdHistory[(cmdHistory.length) + cmdHistoryIndex];
      this.setState({ cmd: value ? value.cmd : '' });
    }
  }

  focusInput = (input) => {
    return input && input.focus()
  }

  scrollToBottom() {
    window.requestAnimationFrame(() => {
      window.scrollTo(0,document.body.scrollHeight);
    })
  }

  render() {
    return (
      <div id="command-line">
        <span className="prompt">
          <Bang symbol={this.props.bang} />
          <span className="cli">{this.state.cmd}</span>

          {this.props.cmdRunning ? (
            <Spinner />
          ) : (
            <Caret />
          )}
        </span>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="cmd"
            value={this.state.cmd}
            ref={(input) => this.focusInput(input)}
            onBlur={(e) => this.focusInput(e.target)}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyPressed}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cmdHistory: state.stdout.cmdHistory,
  cmdHistoryIndex: state.stdout.cmdHistoryIndex,
  cmdRunning: state.stdout.cmdRunning,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  stdout,
  stdoutMultiline,

  startCmd,
  stopCmd,

  addToCmdHistory,
  setCmdHistoryIndex,
  incrementCmdHistoryIndex,
  decrementCmdHistoryIndex,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommandLine)
