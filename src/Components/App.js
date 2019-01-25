import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import GlobalContext from 'Containers/GlobalContext'
import { RootStyles, Center } from 'Components/Styles'

import CommandLine from 'Components/CommandLine'
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'
import theme from 'utilities/theme'

let globalContext = {}
const App = () => {
  const [context, setContext] = useState({
    animate: false,
    theme,
  })

  globalContext = {
    context,
    setContext
  }

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

export { globalContext }
export default App
