import React from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const pause = (cmdObject) => new Promise((resolve, reject) => {
  window.player.pause()
  stdout(<H color={theme.cyan}>Player paused.</H>)
  resolve()
});

export default pause;
