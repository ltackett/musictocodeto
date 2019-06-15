import React from 'react';

import { Highlight as H, MagicalRainbow as MR } from 'Components/Styles'
import avatar from 'textblocks/avatar'

const about = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  if (cmdObject.params.filter(p => p === '-v' || p === '--verbose').length > 0) {
    stdout(avatar)
  }

  stdout([
    <><H>MTCT</H> is a CLI-like interface for SoundCloud written in React.</>,
    <>Built with love by <a href="http://lorintackett.com" target="_blank" rel="noopener noreferrer"><MR>Lorin Tackett</MR></a>.</>,
    ''
  ])

  resolve()
});



export default about;
