import React from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const animate = (cmdObject, { stdout, settings, setSettings }) => new Promise((resolve, reject) => {
  const nextState = !settings.animate
  setSettings({ ...settings, animate: nextState })
  stdout(<H color={$.cyan}>Animations {nextState ? 'enabled' : 'disabled'}.</H>)
  resolve()
});

export default animate;
