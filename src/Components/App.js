import React from 'react';
import styled, { css, keyframes } from 'styled-components'
import theme from 'utilities/theme'

import CommandLine from 'Components/CommandLine';
import Stdout from 'Containers/Stdout'
import Player from 'Containers/Player'

window.animate = false

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

  ${window.animate &&
    css`
      animation: 0.15s ${flicker} ease-out;
      animation-iteration-count: infinite;
    `
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

    white-space: pre;

    // Prevent blank lines from collapsing
    li:after {
      content: '*';
      visibility: hidden;
    }
  }
`

const App = () => (
  <RootStyles>
    <Stdout />
    <CommandLine />
    <Player/>
  </RootStyles>
)

export default App
