import React from 'react'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const repeat = (cmdObject, { stdout }) => new Promise((resolve, reject) => {
  stdout(<H color={$.cyan}>Set to repeat: None|Song|Playlist</H>)
  resolve()
});

export default repeat;
