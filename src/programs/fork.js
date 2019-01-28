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

const fork = ({ params }, { stdout, setBooted, scrollToBottom }) => new Promise((resolve, reject) => {
  setBooted(false)

  if (params.indexOf('-h') >= 0 || params.indexOf('--help') >= 0) {
    stdout(<H>View <MR>MusicToCodeTo</MR> on GitHub</H>)
    resolve()
  } else {
    stdout([
      <MR>{shuffle(forkMessages)[0]}</MR>,
      '',
      <E>Shutting down in:</E>,
      <H>5..</H>
    ])
    scrollToBottom()

    setTimeout(() => {
      stdout(<H>4..</H>)
      scrollToBottom()
    }, 1000);

    setTimeout(() => {
      stdout(<H>3..</H>)
      scrollToBottom()
    }, 2000);

    setTimeout(() => {
      stdout(<H>2..</H>)
      scrollToBottom()
    }, 3000);

    setTimeout(() => {
      stdout(<H>1..</H>)
      scrollToBottom()
    }, 4000);

    // Redirect
    setTimeout(() => {
      resolve()
      window.location = "http://github.com/ltackett/musictocodeto/"
    }, 5000)
  }
});

export default fork;
