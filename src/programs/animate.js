import React from 'react';
import { store } from 'store'
import { stdout as output } from 'modules/stdout/actions'
import { globalContext } from 'Components/App'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const { dispatch } = store
const stdout = (o) => dispatch(output(o))

const pause = (cmdObject) => new Promise((resolve, reject) => {
  const { context, setContext } = globalContext

  if (cmdObject.params.some(p => p === 'start')) {
    setContext({
      ...context,
      animate: true
    })
    stdout(<H color={$.cyan}>Animations enabled.</H>)
  } else if (cmdObject.params.some(p => p === 'stop')) {
    setContext({
      ...context,
      animate: false
    })
    stdout(<H color={$.cyan}>Animations disabled.</H>)
  } else {
    const nextState = !context.animate
    setContext({
      ...context,
      animate: nextState
    })
    stdout(<H color={$.cyan}>Animations {nextState ? 'enabled' : 'disabled'}.</H>)
  }


  resolve()
});

export default pause;
