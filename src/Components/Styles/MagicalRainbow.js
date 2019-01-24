import React, { Component } from 'react'

// ============================================================================
// Magical Rainbow Text!
//
// I feel like no comment is necessary. Rainbows don't need a reason to exist.
// ============================================================================
export default class MagicalRainbowText extends Component {
  state = {
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  }

  static timer = false

  rotateColors() {
    const colors = [...this.state.colors]; // Clone the array with a spread
    colors.unshift(colors.pop());          // Move the last element to the first position
    this.setState({ colors: colors });     // Update the state with MAGIC RAINBOW POWER
    this.timer = setTimeout(() =>          // Use a named timeout so we don't blow up on unmount
      this.rotateColors()                  // Recurstion makes the rockin' world go round
    , 33);                                 // ... at 120fps
  }

  componentDidMount() {
    this.rotateColors(); // RAINBOWS. RAINBOWS. RAINBOWS. RAINBOWS.
  }

  componentWillUnmount() {
    clearTimeout(this.timer); // Ok, stop rainbows. :(
  }

  // Explode the text into an array of letters, and output each letter as a
  // span with a different color.
  colorizeText() {
    const { children } = this.props
    const { colors } = this.state
    let i = 0
    return children.split('').map((letter, index) => {
      if (i+1 > (colors.length - 1)) { i=0 }
      else { i++ }

      return (
        <span key={`${this.props.children} ${i}`} style={{ color: colors[i], textShadow: `${colors[i]} 0 0 10px` }}>
          {letter}
        </span>
      )
    })
  }

  // Let's make some rainbows!
  render() {
    return <span>{this.colorizeText(this.props.text)}</span>
  }
}
