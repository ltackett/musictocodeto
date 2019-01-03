import React from 'react';
import styled from 'styled-components'
import theme from 'utilities/theme'

import CommandLine from 'Components/CommandLine';
import Stdout from 'Containers/Stdout'

// import 'App.scss'

export const RootStyles = styled.div`
  ${theme.colorizeText(theme.phosphorus)}

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
  </RootStyles>
)

export default App
