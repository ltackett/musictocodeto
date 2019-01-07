import React from 'react';
import soundcloudAPI from 'utilities/soundcloudAPI'
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store

const lines = [
  <H color={theme.cyan}>Set to repeat: None|Song|Playlist</H>,
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const repeat = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(stdout(lines))
  resolve()
});

export default repeat;
