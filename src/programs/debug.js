import React from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const debug = (cmdObject, { stdout, settings, setSettings }) => new Promise((resolve, reject) => {
  const nextState = !settings.debug
  setSettings({ ...settings, debug: nextState })

  if (settings.textOnly) {
    stdout(`Debugging ${nextState ? 'enabled' : 'disabled'}.`)
  } else {
    stdout(<H color={$.cyan}>Debugging {nextState ? 'enabled' : 'disabled'}.</H>)
  }

  resolve()
});

export default debug;
