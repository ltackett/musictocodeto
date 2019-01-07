import React, { Component } from 'react'
import styled from 'styled-components'

const S = styled.div`
  background-image: url('/scanlines.png');

  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`

class Scannlines extends Component {
  state = {
    offset: 0,
    opacity: 1,
  }

  componentDidMount() {
    if (window.animate) {
      this.jitter = setInterval(() => {
        this.setState({
          offset: Math.floor(Math.random() * 6) + 1,
          opacity: 1 - (Math.floor(Math.random() * 4) / 20)
        })
      }, 100)
    }
  }

  componentWillUnmount() {
    clearInterval(this.jitter)
  }

  render() {
    const { offset, opacity } = this.state

    return <S style={{
      opacity: opacity,
      backgroundPositionY: `${offset}px`
    }} />
  }
}

export default Scannlines
