import React, { Fragment as F } from 'react';
import { store } from 'store'
import { playNextFromQueue } from 'modules/player/actions'
import Pause from './pause'
import Play from './play'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store

const lines = [
  <H color={theme.cyan}>Going to next song.</H>,
  <F>
    <H color={theme.cyan}>Now playing: </H>
    <H color={theme.pink}>Artist Name - Song Name</H>
  </F>
]

const next = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(playNextFromQueue())
  Play(cmdObject)
    .then(() => resolve())
    .catch(err => reject(err))

});

export default next;
