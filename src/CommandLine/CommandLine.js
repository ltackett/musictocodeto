import React, { Component } from 'react';

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

class CommandLine extends Component {
  state = {
    cmd: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.historyIndex !== this.props.historyIndex) {
      this.valueFromHistory();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { cmd } = event.target;
    this.props.onCommand(cmd.value);
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
    if (event.keyCode === keys.UP) { this.props.onPreviousCommand(); }
    if (event.keyCode === keys.DOWN) { this.props.onNextCommand(); }
  }

  valueFromHistory = () => {
    const { history, historyIndex } = this.props

    if (historyIndex === 0) {
      this.setState({ cmd: '' });
    } else {
      const value = history[(history.length) + historyIndex];
      this.setState({ cmd: value ? value.cmd : '' });
    }
  }


  focusInput = (input) => {
    return input && input.focus()
  }

  render() {
    return (
      <div id="command-line">
        <span className="prompt">
          <Bang symbol={this.props.bang} />
          <span className="cli">{this.state.cmd}</span>

          {this.props.commandRunning ? (
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

export default CommandLine;
