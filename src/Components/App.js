import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import GlobalContext from 'Contexts/Global'
import { RootStyles, Center } from 'Components/Styles'

import CommandLine from 'Components/CommandLine'
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'
import theme from 'utilities/theme'
import scrollToBottom from 'utilities/scrollToBottom'

import { usePlayerReducer } from 'hooks'
import { useStdoutReducer } from '../hooks'

let globalContext = {}
const whirrrr = new Audio('/whirrrr.mp3')
const beepbeep = new Audio('/beep-beep.mp3')

const App = () => {
  const [playerState, playerActions] = usePlayerReducer()
  const [stdoutState, stdoutActions] = useStdoutReducer()

  const [settings, setSettings] = useState({
    animate: false,
  })

  globalContext = {
    theme,
    scrollToBottom,

    settings,
    setSettings,

    ...playerState,
    ...playerActions,

    ...stdoutState,
    ...stdoutActions,
  }

  useEffect(() => {
    if (stdoutState.isBooting) {
      whirrrr.play()
    }
  }, [stdoutState.isBooting])

  useEffect(() => {
    if (stdoutState.isBooted) {
      beepbeep.play()
    }
  }, [stdoutState.isBooted])


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
            <React.Fragment>
              <Stdout />
              <CommandLine />
              {stdoutState.isBooted &&
                <Player/>
              }
            </React.Fragment>
          )} />

        </Switch>
      </Router>
    </GlobalContext.Provider>
  )
}

export { globalContext }
export default App
