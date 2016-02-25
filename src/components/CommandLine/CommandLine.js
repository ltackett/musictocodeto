import React, { Component } from 'react';

const keys = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
};

export default class CLI extends Component {
  state = {
    commandInput: ''
  }

  handleKeyDown = (event) => {
    if (event.which === keys.ENTER) { this.runCommand(this.state.commandInput); }
  }

  handleChange = (event) => {
    this.setState({commandInput: event.target.value});
  }

  runCommand = (command) => {
    alert(command);
    this.setState({commandInput: ''});
  }

  render() {
    const styles = require('./CommandLine.scss');
    const {commandInput} = this.state;

    return (
      <span className={styles.stdin}>
        {commandInput}

        <br/>

        <input ref="CommandLine"
          value={commandInput}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}
