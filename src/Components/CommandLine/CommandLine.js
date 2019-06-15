import React from 'react';
import { CTX } from 'Contexts/Global'

import Bang from './Bang';
import Caret from './Caret';
import Spinner from './Spinner';
import VideoSync from './VideoSync';
import Scanlines from './Scanlines';
import getCmdObject from 'utilities/getCmdObject';

const keys = {
  UP:    38,
  DOWN:  40,
  LEFT:  37,
  RIGHT: 39,
  ENTER: 13,
};

const CommandLine = (props) => {
  // Define state getters/setters
  const [prompt, setPrompt] = React.useState('')

  // Run the boot command on mount.
  React.useEffect(() => {
    window.log('Booted.', { props })
    props.run('boot', false)
  }, [])

  // Get value from history when the cmd history index changes
  React.useEffect(() => {
    valueFromHistory();
  }, [props.cmdHistoryIndex])

  // Scroll to the bottom when the playing state changes
  React.useEffect(() => {
    props.scrollToBottom()
  }, [props.isPlaying])

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

    // Echo the command
    props.stdout(`${props.bang}${props.path !== '/' ? ` ${props.path}` : ''} ${prompt}`);

    // Add command to history
    const cmdObject = getCmdObject(prompt)
    props.addToCmdHistory(cmdObject);

    // Run the command
    props.run(prompt);
    setPrompt('')
  }

  /**
   * `handleInputChange` updates the cmd state as the user types a command.
   *
   * @param {event} event
   */
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
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
      setPrompt('');
    } else {
      const value = cmdHistory[(cmdHistory.length) + cmdHistoryIndex];
      setPrompt(value ? value.cmd : '');
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
            <span className="cli">{prompt}</span>

            {props.isCmdRunning ? (
              <Spinner />
            ) : (
              <Caret />
            )}
          </span>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              ref={(input) => focusInput(input)}
              onBlur={(e) => focusInput(e.target)}
              onChange={handleInputChange}
              onKeyDown={handleKeyPressed}
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default () => <CTX component={CommandLine} />
