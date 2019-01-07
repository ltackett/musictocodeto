import React from 'react';
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store

const lines = [
  <H color={theme.cyan}>Player paused.</H>
]

const pause = (cmdObject) => new Promise((resolve, reject) => {
  window.player.pause()
  dispatch(stdout(lines))
  resolve()
});

export default pause;
