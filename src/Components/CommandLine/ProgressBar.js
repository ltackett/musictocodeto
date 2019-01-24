import React, { useState, useEffect } from 'react';
import theme from 'utilities/theme'

import { Highlight as H } from 'Components/Styles'

const ProgressBar = ({ currentTime, duration, isPlaying }) => {
  const width = 90
  const [elapsed, setElapsed] = useState(0)

  // When props.currentTime updates:
  // Calculate and set the elapsed value to as a single unit of the total width
  useEffect(() => {
    setElapsed(Math.floor(currentTime*width/duration))
  }, [currentTime])

  // Click handler
  const handleClick = () => {
    window.player.pause()
    window.alert('This is no place for mouse events!')
    window.open('https://www.youtube.com/watch?v=fBGWtVOKTkM')
  }

  // Bar
  // ============================================================================
  const Bar = () => (
    <H color={theme.dark}>
      <H color={theme.pink}>[</H>
      {'—'.repeat(elapsed)}
      <H color={theme.gray_500}>█</H>
      {'—'.repeat(width - elapsed)}
      <H color={theme.pink}>]</H>
    </H>
  )

  // Percent
  // ============================================================================
  const Percent = () => <H color={theme.pink}>{Math.floor(currentTime*100/duration)}%</H>

  // Return
  // ============================================================================
  if (!isPlaying) return null
  return (
    <H onClick={handleClick}>
      <Bar />{" "}<Percent />
    </H>
  )
}

export default ProgressBar
