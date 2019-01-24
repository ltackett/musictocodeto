import React, { Fragment as R} from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'

import avatar from 'textblocks/avatar'

import { Highlight as H, MagicalRainbow as MR } from 'Components/Styles'

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const about = (cmdObject) => new Promise((resolve, reject) => {
  if (cmdObject.params.filter(p => p === '-v' || p === '--verbose').length > 0) {
    stdout(avatar)
  }

  stdout([<R><H>MTCT</H> is a labor of love built by <MR>Lorin Tackett</MR>.</R>])

  resolve()
});



export default about;
