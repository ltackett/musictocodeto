import React from 'react';
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

const bang = '>'

const keys = {
  UP:    38,
  DOWN:  40,
  LEFT:  37,
  RIGHT: 39,
  ENTER: 13,
};

const CommandLine = (props) => {
  // Define state getters/setters
  const [cmd, setCmd] = React.useState('')
  const [nextCmd, setNextCmd] = React.useState('')

  // Run the boot command on mount.
  React.useEffect(() => {
    window.log('Booted.', { props })
    handleCommand('boot', false)
  }, [])

  // If there is a nextCmd to run, run it
  React.useEffect(() => {
    if (nextCmd !== '') {
      handleCommand(nextCmd, false)
      setNextCmd('')
    }
  }, [nextCmd])

  // Get value from history when the cmd history index changes
  React.useEffect(() => {
    valueFromHistory();
  }, [props.cmdHistoryIndex])

  // Scroll to the bottom when the playing state changes
  React.useEffect(() => {
    props.scrollToBottom()
  }, [props.isPlaying])

  /**
   * `handleCommand` is the part what makes the whole thing chooch.
   *
   * @param {string} cmd raw command string
   * @param {boolean} echo optionally run the command silently
   *
   *
   *   1. Splits the command string into a command object with the following:
   *      cmd:     the original, unmodified string
   *      program: a string with the command name
   *      params:  an array containing any parameters
   *
   *   2. Pass the command props, which includes
   *      Player state and actions
   *      Stdout state and actions
   *
   *   3. If a program matches with the text you've entered, it will be run.
   *      Essentially, a program is simply a promise.
   *
   *   4. If a program resolves with an object containing the key `command`,
   *      then the string value of that command will be fed back into
   *      handleCommand, to run additional commands as side effects.
   */
  const handleCommand = (cmd, echo = true) => {
    // Break down the cmd string into an object
    const cmdObject = {
      cmd: cmd,
      program: cmd.split(/\s/)[0],
      params: cmd.split(/\s/).slice(1),
    };

    // Echo the command
    echo && props.stdout(`${bang}${props.path !== '/' ? ` ${props.path}` : ''} ${cmd}`);

    // Run the command
    runCommand(cmdObject, props)
      .then(data => {
        // If a command is passed back from the program, queue it to run next
        if (data.command) {
          setNextCmd(data.command)
        }

        if (cmdObject.cmd !== '' && echo) { props.stdout('') }
        props.scrollToBottom();
      })

      // Catch errors
      .catch(data => {
        if (data.error) { props.stdout(<R><E>Error:</E> {data.error}</R>) }
        if (cmdObject.cmd !== '' && echo) { props.stdout('') }
        props.scrollToBottom();
      })

    // Add command to history
    if (!!cmd && cmd !== '' && echo) {
      props.addToCmdHistory(cmdObject);
    }

    // Reset historyIndex
    props.setCmdHistoryIndex(0);
  }

  /**
   * `handleSubmit` is fired when the user presses enter in the CLI.
   *
   * @param {event} event
   *
   *   1. Suppress the default form submission action.
   *   2. Call `handleCommand` with the cmd string.
   *   3. Reset the cmd state.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    handleCommand(cmd);
    setCmd('')
  }

  /**
   * `handleInputChange` updates the cmd state as the user types a command.
   *
   * @param {event} event
   */
  const handleInputChange = (event) => {
    setCmd(event.target.value);
  }

  /**
   * `handleKeyPressed` listens for special keys to trigger certain additional actions.
   *
   * @param {event} event
   */
  const handleKeyPressed = (event) => {
    if (event.keyCode === keys.UP) { handleCurseThroughHistory('decrement'); }
    if (event.keyCode === keys.DOWN) { handleCurseThroughHistory('increment'); }
  }

  /**
   * `handleCurseThroughHistory` fires the actions to increment or decrement the cmd history index
   *
   * @param {string} direction
   */
  const handleCurseThroughHistory = (direction) => {
    const { cmdHistory, cmdHistoryIndex } = props;

    // historyIndex is a count-backwards-from-zero index, so these boundaries
    // read kinda backwards. It's mathematically correct, however. Since the
    // lower limit is a negative number, and the upper limit is 0.
    const lowerLimit = (cmdHistoryIndex + 1) >= -(cmdHistory.length);
    const upperLimit = (cmdHistoryIndex - 1) <= 0;

    // Curse through history, within lower and upper limits
    if (direction === 'decrement' && lowerLimit) { props.decrementCmdHistoryIndex() }
    if (direction === 'increment' && upperLimit) { props.incrementCmdHistoryIndex() }
  }

  /**
   * `valueFromHistory` reads the cmdHistory and cmdHistory index, and fetches the appropriate cmd history entry at the current index.
   */
  const valueFromHistory = () => {
    const { cmdHistory, cmdHistoryIndex } = props

    if (cmdHistoryIndex === 0) {
      setCmd('');
    } else {
      const value = cmdHistory[(cmdHistory.length) + cmdHistoryIndex];
      setCmd(value ? value.cmd : '');
    }
  }

  /**
   * `focusInput` sets focus to an input DOM node
   *
   * @param {HTMLElement} input
   */
  const focusInput = (input) => {
    return input && input.focus()
  }

  // ==========================================================================

  return (
    <div id="command-line">
      <Scanlines />
      <VideoSync />

      {!props.isBooted ? (
        <Caret color={props.theme.danger} />
      ) : (
        <>
          <span className="prompt">
            <Bang symbol={props.bang} />
            {props.path !== '/' && `${props.path} `}
            <span className="cli">{cmd}</span>

            {props.isCmdRunning ? (
              <Spinner />
            ) : (
              <Caret />
            )}
          </span>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={cmd}
              ref={(input) => focusInput(input)}
              onBlur={(e) => focusInput(e.target)}
              onChange={handleInputChange}
              onKeyDown={handleKeyPressed}
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}

      {props.isPlaying &&
        <>
          <br />
          <br />
          <ProgressBar />
        </>
      }
    </div>
  );
}

export default () => <CTX component={CommandLine} />
