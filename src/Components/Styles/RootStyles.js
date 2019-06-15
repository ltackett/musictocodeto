import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { CTX } from 'Contexts/Global'

const RootStyles = ({ theme }) => {
  const $ = theme

  const Component = createGlobalStyle`
    body {
      ${$.colorizeText($.phosphorus)}
      opacity: 1;
      max-width: 100vw;
    }

    a {
      ${$.colorizeText('#fff')}
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

  return <Component />
}

export default () => <CTX component={RootStyles} />
