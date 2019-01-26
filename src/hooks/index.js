import { useReducer } from 'react'

import stdoutReducer, { initialState as stdoutInitialState} from './stdout/reducer'
import stdoutActions from './stdout/actions'

import playerReducer, { initialState as playerInitialState} from './player/reducer'
import playerActions from './player/actions'

export const useStdoutReducer = () => {
  const [state, dispatch] = useReducer(stdoutReducer, stdoutInitialState)
  return [state, stdoutActions(dispatch)]
}

export const usePlayerReducer = () => {
  const [state, dispatch] = useReducer(playerReducer, playerInitialState)
  return [state, playerActions(dispatch)]
}
