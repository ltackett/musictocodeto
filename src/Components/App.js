import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import GlobalContext from 'Containers/GlobalContext'
import { RootStyles, Center } from 'Components/Styles'

import CommandLine from 'Components/CommandLine'
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'
import theme from 'utilities/theme'

const App = () => {
  const [context, setContext] = useState({
    cmdHistory: [],
    cmdHistoryIndex: 0,
    cmdRunning: false,

    isPlaying: false,
    currentTime: 0,
    duration: 0,

    animate: false,
    theme,
  })

  return (
    <GlobalContext.Provider value={{ context, setContext }}>
      <RootStyles>
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
                <Player/>
              </React.Fragment>
            )} />

          </Switch>
        </Router>
      </RootStyles>
    </GlobalContext.Provider>
  )
}


export default App
