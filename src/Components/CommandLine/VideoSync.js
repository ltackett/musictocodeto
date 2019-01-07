import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'

const sync = keyframes`
  0% { top: 110vh; }
  100% { top: -10vh; }
`

const VideoSync = styled.div`
  pointer-events: none;
  background: linear-gradient(#000, transparent);
  opacity: 0.2;

  ${window.animate &&
    css`
      animation: 10s ${sync} linear;
      animation-iteration-count: infinite;
    `
  }

  position: fixed;
  height: 200px;
  left: 0;
  right: 0;
  z-index: 1;
`

export default VideoSync
