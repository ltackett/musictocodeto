import React  from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'

import GlobalContext from 'Contexts/Global'
import { RootStyles, Center } from 'Components/Styles'

import CommandLine from 'Components/CommandLine'
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'
import theme from 'utilities/theme'
import scrollToBottom from 'utilities/scrollToBottom'
import runCommand from 'utilities/runCommand';
import getCmdObject from 'utilities/getCmdObject';
import 'utilities/log'

import { usePlayerReducer } from 'hooks'
import { useStdoutReducer } from '../hooks'

import { Error as E } from 'Components/Styles'

let globalContext = {}
const whirrrr = new Audio('/whirrrr.mp3')
const beepbeep = new Audio('/beep-beep.mp3')

const App = () => {
  const [cmd, setCmd] = React.useState('')
  const [settings, setSettings] = React.useState({
    animate: localStorage.animate ? JSON.parse(localStorage.animate) : false,
    debug: localStorage.debug ? JSON.parse(localStorage.debug) : false,
  })

  const [playerState, playerActions] = usePlayerReducer()
  const [stdoutState, stdoutActions] = useStdoutReducer()


  globalContext = {
    cmd,
    run: setCmd,
    bang: '>',

    theme,
    scrollToBottom,

    settings,
    setSettings: (obj) => {
      Object.keys(obj).forEach(key => {
        localStorage.setItem(key, obj[key])
        setSettings(obj)
      })
    },

    ...playerState,
    ...playerActions,

    ...stdoutState,
    ...stdoutActions,
  }

  React.useEffect(() => {
    if (stdoutState.isBooting) {
      whirrrr.play()
    }
  }, [stdoutState.isBooting])

  React.useEffect(() => {
    if (stdoutState.isBooted) {
      beepbeep.play()
    }
  }, [stdoutState.isBooted])

  // If there is a cmd to run, run it
  React.useEffect(() => {
    if (cmd !== '') {
      handleCommand(cmd)
      setCmd('')
    }
  }, [cmd])

  /**
   * `handleCommand` is the part what makes the whole thing chooch.
   *
   * @param {string} cmd raw command string
   * @param {boolean} echo optionally run the command silently
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
  const handleCommand = (cmd) => {
    const cmdObject = getCmdObject(cmd)

    // Run the command
    runCommand(cmdObject, globalContext)
      .then(data => {
        // If a command is passed back from the program, queue it to run next
        if (data.command) { globalContext.run(data.command) }
        globalContext.scrollToBottom();
      })

      // Catch errors
      .catch(data => {
        if (data.error) { globalContext.stdout(<><E>Error:</E> {data.error}</>) }
        globalContext.scrollToBottom();
      })

    // Reset historyIndex
    globalContext.setCmdHistoryIndex(0);
  }

  return (
    <GlobalContext.Provider value={{...globalContext}}>
      <RootStyles />
      <Router>
        <Switch>

          <Route exact path="/" render={() => (
            <Center>
              <Link to="/cli">Boot . . .</Link>
            </Center>
          )} />

          <Route exact path="/cli" render={() => (
            <>
              <Stdout />
              {stdoutState.isBooted &&
                <Player />
              }
              <CommandLine />
            </>
          )} />

        </Switch>
      </Router>
    </GlobalContext.Provider>
  )
}

export { globalContext }
export default App
