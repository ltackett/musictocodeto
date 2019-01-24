import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { CTX } from 'Containers/GlobalContext'

const o0 = 0.95
const o1 = 1

const flicker = keyframes`
  0% { opacity: ${o0}; }
  1% { opacity: ${o1}; }
  50% { opacity: ${o1}; }
  51% { opacity: ${o0}; }
  100% { opacity: ${o0}; }
`

const RootStyles = ({ context, children }) => {
  const { animate, theme } = context
  const $ = theme

  const Component = styled.div`
    ${$.colorizeText($.phosphorus)}
    opacity: 1;
    max-width: 100vw;

    ${() => animate && css`
      animation: 0.15s ${flicker} ease-out;
      animation-iteration-count: infinite;
    `}

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

  return <Component>{children}</Component>
}

export default ({ children }) => <CTX component={RootStyles}>{children}</CTX>
