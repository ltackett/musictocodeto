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

export const stdout = (data) => (dispatch) => {
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

export const incrementCmdHistoryIndex = () => (dispatch) => dispatch({ type: INCREMENT_CMD_HISTORY_INDEX })
export const decrementCmdHistoryIndex = () => (dispatch) => dispatch({ type: DECREMENT_CMD_HISTORY_INDEX })
export const setCmdHistoryIndex = (index) => (dispatch) => dispatch({ type: SET_CMD_HISTORY_INDEX, index })
export const addToCmdHistory = (cmdObject) => (dispatch) => dispatch({
  type: ADD_TO_CMD_HISTORY,
  cmdObject
})

// ============================================================================

export const startCmd = () => (dispatch) => dispatch({ type: START_CMD })
export const stopCmd = () => (dispatch) => dispatch({ type: STOP_CMD })

// ============================================================================
