import React, { Fragment as R } from 'react';
import { shuffle } from 'lodash'
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

import { Highlight as H } from 'Components/Styles'
import MagicalRaindbow from 'Components/Text_MagicalRainbow'
import $ from 'constants'

const { dispatch } = store

const forkMessages = [
  "fork me hard!",
  "fork me harder!",
  "could we spoon instead?",
  "fork you too, buddy!",
  "what the fork!",
  "let's talk about fork lore...",
]

const fork = (cmdObject) => new Promise((resolve, reject) => {
  const { params } = cmdObject

  if (params.indexOf('-h') >= 0 || params.indexOf('--help') >= 0) {
    dispatch(stdout(<H>View <MagicalRaindbow>MusicToCodeTo</MagicalRaindbow> on GitHub</H>))
    resolve()
  } else {
    dispatch(stdout([
      <R><H>{shuffle(forkMessages)[0]}</H></R>,
      <R><H color={$.danger}>Exiting...</H></R>
    ]))

    // Redirect
    setTimeout(() => {
      resolve()
      window.location = "http://github.com/ltackett/musictocodeto/"
    }, 2000)
  }
});

export default fork;
