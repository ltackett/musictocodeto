import React from 'react';
import theme from 'utilities/theme'

import H from 'Components/Text_Highlight'


const ProgressBar = ({ currentTime, duration }) => {
  const progress = () => {
    const width = 80
    const elapsed = Math.floor(currentTime*width/duration)
    const remaining = width - elapsed

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

  const percent = () => (
    <H color={theme.pink}>
      {Math.floor(currentTime*100/duration)}%
    </H>
  )

  const handleClick = () => {
    window.player.pause()
    window.alert('This is no place for mouse events!')
    window.open('https://www.youtube.com/watch?v=fBGWtVOKTkM')
  }

  if (currentTime === 0 && duration === 0) return null

  return (
    <H onClick={handleClick}>
      {progress()} {percent()}
    </H>
  );
}

export default ProgressBar;
