import React from 'react';

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const skip = ({ params }, { stdout, isPlaying, settings }) => new Promise((resolve, reject) => {
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
    if (settings.textOnly) {
      stdout(`Skipped ${skipBy > 0 ? 'forward' : 'back'} ${skipBy > 0 ? skipBy : -skipBy} seconds.`)
    } else {
      stdout(<H color={$.cyan}>Skipped {skipBy > 0 ? 'forward' : 'back'} {skipBy > 0 ? skipBy : -skipBy} seconds.</H>)
    }
  }

  resolve()
});

export default skip;
