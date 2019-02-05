import React, { Fragment as F } from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const play = ({ params }, { stdout, nowPlaying }) => new Promise((resolve, reject) => {
  if (params && params.length === 2) {
    return resolve('trying to play song from SoundCloud')
  } else if (nowPlaying !== null) {
    window.player.play()
    stdout(
      <F>
        <H color={$.cyan}>Now playing: </H>
        <H color={$.pink}>{nowPlaying.artist} - {nowPlaying.title}</H>
      </F>
    )
    return resolve()
  }

  window.player.pause()
  reject({ error: 'There is no song loaded.' })
});

export default play;
