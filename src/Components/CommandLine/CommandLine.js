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

  componentDidMount() {
    this.handleCommand('boot', false)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cmdHistoryIndex !== this.props.cmdHistoryIndex) {
      this.valueFromHistory();
    }

    // Scroll to the bottom when player state changes
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.props.scrollToBottom()
    }
  }

  // ==========================================================================
  // handleCommand
  // This is the thing what makes the whole thing chooch.
  //
  //   1. Splits the command string into a command object with the following:
  //      cmd:     the original, unmodified string
  //      program: a string with the command name
  //      params:  an array containing any parameters
  //
  //   2. Pass the command this.props, which includes
  //      Player state and actions
  //      Stdout state and actions
  //
  //   3. If a program matches with the text you've entered, it will be run.
  //      Essentially, a program is simply a promise.
  //
  //   5. If a program resolves with an object containing the key `command`,
  //      then the string value of that command will be fed back into
  //      this.handleCommand, to run additional commands as side effects.
  //
  // Any command can be run silently by passing `false` as a second param
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
        this.props.scrollToBottom();
        this.props.stopCmd();
      })

      // Catch errors
      .catch(data => {
        this.props.stopCmd();
        if (data.error) { this.props.stdout(<R><E>Error:</E> {data.error}</R>) }
        if (cmdObject.cmd !== '') { this.props.stdout('') }
        this.props.scrollToBottom();
      })

    // Add command to history
    if (!!cmd && cmd !== '' && echo) {
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

  render() {
    const {
      isBooted,
      isPlaying,
      icCmdRunning,
      currentTime,
      duration,
    } = this.props

    return (
      <div id="command-line">
        <Scanlines />
        <VideoSync />

        {isBooted &&
          <React.Fragment>
            <span className="prompt">
              {`${this.props.path} `}
              <Bang symbol={this.props.bang} />
              <span className="cli">{this.state.cmd}</span>

              {icCmdRunning ? (
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
          </React.Fragment>
        }

        {!isBooted &&
          <Caret color={this.props.theme.danger} />
        }

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
