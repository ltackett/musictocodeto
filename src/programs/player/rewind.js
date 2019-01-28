import React from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const rewind = (cmdObject, { stdout, isPlaying }) => new Promise((resolve, reject) => {
  if (!isPlaying) {
    reject({ error: 'No song currently playing.' })
    return
  }

  window.player.skip(-10000)
  stdout(
    <H color={$.cyan}>You are kind.</H>
  )

  resolve()
});

export default rewind;
