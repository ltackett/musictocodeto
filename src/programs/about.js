import React, { Fragment as R} from 'react';

import { Highlight as H, MagicalRainbow as MR } from 'Components/Styles'
import avatar from 'textblocks/avatar'

const about = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  if (cmdObject.params.filter(p => p === '-v' || p === '--verbose').length > 0) {
    stdout(avatar)
  }

  stdout([<R><H>MTCT</H> is a labor of love built by <MR>Lorin Tackett</MR>.</R>])

  resolve()
});



export default about;
