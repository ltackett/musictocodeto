import React from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'

import theme from 'utilities/theme'
import H from 'Components/Text_Highlight'

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const pause = ({ params }) => new Promise((resolve, reject) => {
  const { isPlaying } = store.getState().player
  if (!isPlaying) {
    reject({ error: 'No song currently playing.' })
    return
  }

  let skipBy = 0
  const paramsWithNums = params
    .map(p => !isNaN(parseInt(p)) ? parseInt(p) : p)
    .filter(p => typeof(p) === 'number')

  if (paramsWithNums.length > 0) {
    paramsWithNums.forEach(n => {
      skipBy = skipBy + n
    });

    window.player.skip(skipBy)
    stdout(
      <H color={theme.cyan}>
        Skipped {skipBy > 0 ? 'forward' : 'back'} {skipBy > 0 ? skipBy : -skipBy} seconds.</H>
    )
  }

  resolve()
});

export default pause;
