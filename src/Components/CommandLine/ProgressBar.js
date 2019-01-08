import React, { Component } from 'react';
import theme from 'utilities/theme'

import H from 'Components/Text_Highlight'

class ProgressBar extends Component {
  state = {
    active: false,
    elapsed: 0,
    remaining: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTime, duration } = this.props

    // Update state when currentTime changes
    if (currentTime !== prevProps.currentTime) {
      const width = 90
      const elapsed = Math.floor(currentTime*width/duration)
      const remaining = width - elapsed

      this.setState({ elapsed, remaining })
    }

    // Notify parent if active
    if (currentTime > 0 && !this.state.active) {
      this.setState({ active: true })
      this.props.onChange({ active: true })
    }

    // Notify parent if inactive
    if ((currentTime === 0 || isNaN(currentTime)) && this.state.active) {
      this.setState({ active: false })
      this.props.onChange({ active: false })
    }
  }

  handleClick = () => {
    window.player.pause()
    window.alert('This is no place for mouse events!')
    window.open('https://www.youtube.com/watch?v=fBGWtVOKTkM')
  }

  bar = () => {
    const { elapsed, remaining } = this.state

    return (
      <H color={theme.dark}>
        <H color={theme.pink}>[</H>
        {'—'.repeat(elapsed)}
        <H color={theme.gray_500}>█</H>
        {'—'.repeat(remaining)}
        <H color={theme.pink}>]</H>
      </H>
    )
  }

  percent = () => {
    const { currentTime, duration } = this.props

    return (
      <H color={theme.pink}>
        {Math.floor(currentTime*100/duration)}%
      </H>
    )
  }

  render() {
    if (!this.state.active) return null

    return (
      <H onClick={this.handleClick}>
        {this.bar()} {this.percent()}
      </H>
    )
  }
}

export default ProgressBar;
