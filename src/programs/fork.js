import React from 'react';
import { shuffle } from 'lodash'

const R = React.Fragment

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
    resolve({ lines: ['View musictocodeto on GitHub.'] })
  } else {
    resolve({ lines: [
      <R><em>{shuffle(forkMessages)[0]}</em></R>,
      <R><em className="err">Exiting...</em></R>
    ] });

    // Redirect
    setTimeout(() => {
      window.location = "http://github.com/ltackett/musictocodeto/"
    }, 2000)
  }
});

export default fork;
