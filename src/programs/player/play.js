import React, { Fragment as F } from 'react';
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store

const play = (cmdObject) => new Promise((resolve, reject) => {
  const playerState = store.getState().player
  const { nowPlaying } = playerState

  if (nowPlaying !== null) {
    window.player.play()
    dispatch(stdout(
      <F>
        <H color={theme.cyan}>Now playing: </H>
        <H color={theme.pink}>{nowPlaying.artist} - {nowPlaying.title}</H>
      </F>
    ))
    return resolve()
  }

  window.player.pause()
  reject({ error: 'There is no song loaded.' })
});

export default play;
