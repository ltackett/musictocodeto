import React from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const pause = (cmdObject, { settings, stdout }) => new Promise((resolve, reject) => {
  window.player.pause()
  if (settings.textOnly) {
    stdout('Player paused.')
  } else {
    stdout(<H color={$.cyan}>Player paused.</H>)
  }
  resolve()
});

export default pause;
