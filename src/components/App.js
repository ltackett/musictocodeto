import React, { Component } from 'react';

import CommandLine from './CommandLine';
import runCommand from '../runCommand';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bang: '>',
      commandRunning: false,
      history: [],
      historyIndex: 0,
      stdOut: [],
      stdOutMaxLines: 1000,
    };
  }

  // Commands
  // ==========================================================================

  handleCommand(cmd) {
    const commandObject = {
      cmd: cmd,
      program: cmd.split(/\s/)[0],
      params: cmd.split(/\s/).slice(1),
    };

    // Echo the command
    this.appendToStdOut(`${this.state.bang} ${cmd}`);

    // Run the command
    this.toggleCommandRunning(true);

    runCommand(commandObject).then(data => {
      this.toggleCommandRunning(false);
      if (data.stdOut) { this.appendLinesToStdOut(data.stdOut); }
    }).catch(data => {
      this.toggleCommandRunning(false);
      if (data.stdOut) { this.appendLinesToStdOut(data.stdOut); }
    })

    // Add command to history
    this.appendToHistory(commandObject);

    // Reset historyIndex
    this.setState({ historyIndex: 0 });
  }

  appendLinesToStdOut(lines) {
    lines.forEach((line, i) => {
      setTimeout(() => {this.appendToStdOut(line)}, 7 * i)
    });
  }

  appendToStdOut(text) {
    const stdOut = [...this.state.stdOut];
    const { stdOutMaxLines } = this.state;

    stdOut.push(text)
    if (stdOut.length > stdOutMaxLines) { stdOut.shift(); }

    this.setState({ stdOut });
    this.scrollToBottom();
  }

  appendToHistory(commandObject) {
    const history = [...this.state.history];
    history.push(commandObject);
    this.setState({ history })
  }

  toggleCommandRunning(value) {
    this.setState({ commandRunning: value });
  }

  // History
  // ==========================================================================

  handleHistoryPage(page) {
    const { history, historyIndex } = this.state;

    // historyIndex is a count-backwards-from-zero index, so these boundaries
    // read kinda backwards. It's mathematically correct, however. Since the
    // lower limit is a negative number, and the upper limit is 0.
    const lowerLimit = (historyIndex + page) >= -(history.length);
    const upperLimit = (historyIndex + page) <= 0;
    if (lowerLimit && upperLimit) {
      this.setState({ historyIndex: historyIndex + page });
    }
  }

  // ==========================================================================

  scrollToBottom() {
    window.requestAnimationFrame(() => {
      window.scrollTo(0,document.body.scrollHeight);
    })
  }

  render() {
    const {
      commandRunning,
      history,
      historyIndex,
      stdOut,
    } = this.state;

    console.log('env: ', process.env);

    return (
      <div>
        <ul id="lines">
          {stdOut.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        <CommandLine
          onCommand={(cmd) => this.handleCommand(cmd)}
          onPreviousCommand={() => this.handleHistoryPage(-1)}
          onNextCommand={() => this.handleHistoryPage(1)}
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
