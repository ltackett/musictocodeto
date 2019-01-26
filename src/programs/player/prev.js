import React, { Fragment as F } from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const lines = [
  <H color={$.cyan}>Going to previous song.</H>,
  <F>
    <H color={$.cyan}>Now playing: </H>
    <H color={$.pink}>Artist Name - Song Name</H>
  </F>,
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const prev = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  stdout(lines)
  resolve()
});

export default prev;
