import React, { Fragment as F } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const { dispatch } = store

const lines = [
  <H color={$.cyan}>Going to previous song.</H>,
  <F>
    <H color={$.cyan}>Now playing: </H>
    <H color={$.pink}>Artist Name - Song Name</H>
  </F>,
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const prev = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(stdout(lines))
  resolve()
});

export default prev;
