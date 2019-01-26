import {
  ADD_LINE,
  ADD_LINES,

  ADD_TO_CMD_HISTORY,
  SET_CMD_HISTORY_INDEX,
  INCREMENT_CMD_HISTORY_INDEX,
  DECREMENT_CMD_HISTORY_INDEX,

  START_CMD,
  STOP_CMD
} from './constants'

// ============================================================================

export default (dispatch) => {

  const startCmd = () => dispatch({ type: START_CMD })
  const stopCmd = () => dispatch({ type: STOP_CMD })

  // ============================================================================

  const stdout = (data) => {
    if (Array.isArray(data)) {
      dispatch({
        type: ADD_LINES,
        lines: data
      })
    } else {
      dispatch({
        type: ADD_LINE,
        line: data
      })
    }
  }

  // ============================================================================

  const incrementCmdHistoryIndex = () => dispatch({ type: INCREMENT_CMD_HISTORY_INDEX })
  const decrementCmdHistoryIndex = () => dispatch({ type: DECREMENT_CMD_HISTORY_INDEX })
  const setCmdHistoryIndex = (index) => dispatch({ type: SET_CMD_HISTORY_INDEX, index })
  const addToCmdHistory = (cmdObject) => dispatch({
    type: ADD_TO_CMD_HISTORY,
    cmdObject
  })

  // ============================================================================

  return {
    stdout,
    startCmd,
    stopCmd,
    incrementCmdHistoryIndex,
    decrementCmdHistoryIndex,
    setCmdHistoryIndex,
    addToCmdHistory,
  }
}
