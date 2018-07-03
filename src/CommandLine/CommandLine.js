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
  constructor() {
    super();
    this.state = {
      cmd: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { cmd } = event.target;
    this.props.onCommand(cmd.value);
    this.setState({ cmd: '' });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleKeyPressed(event) {
    if (event.keyCode === keys.UP) { this.props.onPreviousCommand(); }
    if (event.keyCode === keys.DOWN) { this.props.onNextCommand(); }
  }

  valueFromHistory() {
    const { history, historyIndex } = this.props

    if (historyIndex === 0) {
      this.setState({ cmd: '' });
    } else {
      const value = history[(history.length) + historyIndex];
      this.setState({ cmd: value ? value.cmd : '' });
    }
  }

  componentDidMount() {
    this.cmdInput.focus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.historyIndex != this.props.historyIndex) {
      this.valueFromHistory();
    }
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

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            name="cmd"
            value={this.state.cmd}
            onChange={(e) => this.handleInputChange(e)}
            onKeyDown={(e) => this.handleKeyPressed(e)}
            ref={(input) => {this.cmdInput = input}}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CommandLine;
