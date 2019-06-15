import React from 'react';

import { Highlight as H, MagicalRainbow as MR } from 'Components/Styles'
import avatar from 'textblocks/avatar'

const about = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  if (cmdObject.params.filter(p => p === '-v' || p === '--verbose').length > 0) {
    stdout(avatar)
  }

  stdout([<><H>MTCT</H> is a labor of love built by <MR>Lorin Tackett</MR>.</>])

  resolve()
});



export default about;
