import React, { Fragment as F } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'
import { store } from 'store'
import { stdoutMultiline } from 'modules/stdout'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store

const lines = [
  <H color={theme.cyan}>Going to next song.</H>,
  <F>
    <H color={theme.cyan}>Now playing: </H>
    <H color={theme.pink}>Artist Name - Song Name</H>
  </F>,
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const next = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(stdoutMultiline(lines))
  resolve()
});

export default next;
