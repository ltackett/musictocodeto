import React, { Component } from 'react';
import { CTX } from 'Contexts/Global'

import runCommand from './runCommand';

import Bang from './Bang';
import Caret from './Caret';
import Spinner from './Spinner';
import VideoSync from './VideoSync';
import Scanlines from './Scanlines';
import ProgressBar from './ProgressBar';

import { Error as E } from 'Components/Styles'

const R = React.Fragment

const keys = {
  UP:    38,
  DOWN:  40,
  LEFT:  37,
  RIGHT: 39,
  ENTER: 13,
};

class CommandLine extends Component {
  state = {
    bang: '>',
    cmd: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cmdHistoryIndex !== this.props.cmdHistoryIndex) {
      this.valueFromHistory();
    }

    // Scroll to the bottom when player state changes
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.scrollToBottom()
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

  handleCommand = (cmd, echo = true) => {

    const cmdObject = {
      cmd: cmd,
      program: cmd.split(/\s/)[0],
      params: cmd.split(/\s/).slice(1),
    };

    // Echo the command
    echo && this.props.stdout(`${this.state.bang} ${cmd}`);

    // Run the command
    this.props.startCmd();
    runCommand(cmdObject, this.props)
      .then(data => {
        // If a command is passed back from the program, run it
        if (data.command) { this.handleCommand(data.command, false) }

        if (cmdObject.cmd !== '' && echo) { this.props.stdout('') }
        this.scrollToBottom();
        this.props.stopCmd();
      })

      // Catch errors
      .catch(data => {
        this.props.stopCmd();
        if (data.error) { this.props.stdout(<R><E>Error:</E> {data.error}</R>) }
        if (cmdObject.cmd !== '') { this.props.stdout('') }
        this.scrollToBottom();
      })

    // Add command to history
    if (!!cmd && cmd !== '') {
      this.props.addToCmdHistory(cmdObject);
    }

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
    const {
      isPlaying,
      currentTime,
      duration,
      cmdRunning
    } = this.props

    return (
      <div id="command-line">
        <Scanlines />
        <VideoSync />

        <span className="prompt">
          <Bang symbol={this.props.bang} />
          <span className="cli">{this.state.cmd}</span>

          {cmdRunning ? (
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

        {isPlaying &&
          <React.Fragment>
            <br />
            <br />
            <ProgressBar {...{ currentTime, duration, isPlaying }} />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default () => <CTX component={CommandLine} />
