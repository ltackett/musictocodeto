import React from 'react';
import { shuffle } from 'lodash'

import {
  MagicalRainbow as MR,
  Highlight as H,
  Error as E
} from 'Components/Styles'

const forkMessages = [
  "fork me hard!",
  "fork me harder!",
  "could we spoon instead?",
  "fork you too, buddy!",
  "what the fork!",
  "let's talk about fork lore...",
]

const fork = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  const { params } = cmdObject

  if (params.indexOf('-h') >= 0 || params.indexOf('--help') >= 0) {
    stdout(<H>View <MR>MusicToCodeTo</MR> on GitHub</H>)
    resolve()
  } else {
    stdout([
      <MR>{shuffle(forkMessages)[0]}</MR>,
      '',
      <E>Exiting:</E>,
      <H>5..</H>
    ])

    setTimeout(() => {
      stdout(<H>4..</H>)
    }, 1000);

    setTimeout(() => {
      stdout(<H>3..</H>)
    }, 2000);

    setTimeout(() => {
      stdout(<H>2..</H>)
    }, 3000);

    setTimeout(() => {
      stdout(<H>1..</H>)
    }, 4000);

    // Redirect
    setTimeout(() => {
      resolve()
      window.location = "http://github.com/ltackett/musictocodeto/"
    }, 5000)
  }
});

export default fork;
