import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { CTX } from 'Contexts/Global'

const sync = keyframes`
  0% { top: 110vh; }
  100% { top: -10vh; }
`

const VideoSync = ({ settings }) => {
  if (!settings.animate) return null

  const Component = styled.div`
    pointer-events: none;
    background: linear-gradient(#000, transparent);
    opacity: 0.2;

    ${settings.animate && css`
      animation: 10s ${sync} linear;
      animation-iteration-count: infinite;
    `}

    position: fixed;
    height: 200px;
    left: 0;
    right: 0;
    z-index: 1;
  `

  return <Component />
}

export default () => <CTX component={VideoSync} />
