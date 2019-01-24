import React from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const pause = (cmdObject) => new Promise((resolve, reject) => {
  window.player.pause()
  stdout(<H color={$.cyan}>Player paused.</H>)
  resolve()
});

export default pause;
