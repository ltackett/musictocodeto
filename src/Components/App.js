import React from 'react';
import styled, { css, keyframes } from 'styled-components'
import theme from 'utilities/theme'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import CommandLine from 'Components/CommandLine';
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'

const o0 = 0.95
const o1 = 1

const flicker = keyframes`
  0% { opacity: ${o0}; }
  1% { opacity: ${o1}; }
  50% { opacity: ${o1}; }
  51% { opacity: ${o0}; }
  100% { opacity: ${o0}; }
`

export const RootStyles = styled.div`
  ${theme.colorizeText(theme.phosphorus)}
  opacity: 1;
  max-width: 100vw;

  ${({ animate }) => animate && css`
    animation: 0.15s ${flicker} ease-out;
    animation-iteration-count: infinite;
  `}

  a {
    ${theme.colorizeText('#fff')}
    text-decoration: none;

    &:hover { text-decoration: underline; }
  }

  form {
    opacity: 0;
    position: absolute;
  }

  em {
    font-style: normal;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    // Prevent blank lines from collapsing
    li:after {
      content: '*';
      visibility: hidden;
    }
  }
`

const Center = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`

const App = () => (
  <RootStyles animate={window.animate}>
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
)

export default App
