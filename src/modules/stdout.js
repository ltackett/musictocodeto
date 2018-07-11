import reducer, {
  ADD_LINE,
  ADD_LINES,

  ADD_TO_CMD_HISTORY,
  SET_CMD_HISTORY_INDEX,
  INCREMENT_CMD_HISTORY_INDEX,
  DECREMENT_CMD_HISTORY_INDEX,

  START_CMD,
  STOP_CMD,
} from './stdoutReducer'

export { reducer as default, ADD_LINE, ADD_LINES }

// ============================================================================

export const stdout = (line) => (dispatch) => dispatch({
  type: ADD_LINE,
  line
})

// ============================================================================

export const stdoutMultiline = (lines) => (dispatch) => dispatch({
  type: ADD_LINES,
  lines
})

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
