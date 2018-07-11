export const ADD_LINE = 'stdout/ADD_LINE'
export const ADD_LINES = 'stdout/ADD_LINES'

export const ADD_TO_CMD_HISTORY = 'stdout/ADD_TO_CMD_HISTORY'
export const SET_CMD_HISTORY_INDEX = 'stdout/SET_CMD_HISTORY_INDEX'
export const INCREMENT_CMD_HISTORY_INDEX = 'stdout/INCREMENT_CMD_HISTORY_INDEX'
export const DECREMENT_CMD_HISTORY_INDEX = 'stdout/DECREMENT_CMD_HISTORY_INDEX'

export const START_CMD = 'stdout/START_CMD'
export const STOP_CMD = 'stdout/STOP_CMD'

export const initialState = {
  stdoutLines: [],
  cmdHistory: [],
  cmdHistoryIndex: 0,
  cmdRunning: false,
}

// ============================================================================

export default (state = initialState, action) => {
  let stdoutLines, cmdHistory, cmdHistoryIndex

  switch (action.type) {
    case ADD_LINE:
      stdoutLines = [...state.stdoutLines]
      stdoutLines.push(action.line)
      return { ...state, stdoutLines  }

    case ADD_LINES:
      stdoutLines = [...state.stdoutLines]
      stdoutLines = stdoutLines.concat(action.lines)
      return { ...state, stdoutLines }

    case ADD_TO_CMD_HISTORY:
      cmdHistory = [...state.cmdHistory]
      cmdHistory.push(action.cmdObject)
      return { ...state, cmdHistory  }

    case INCREMENT_CMD_HISTORY_INDEX:
      cmdHistoryIndex = state.cmdHistoryIndex
      cmdHistoryIndex++
      return { ...state, cmdHistoryIndex }

    case DECREMENT_CMD_HISTORY_INDEX:
      cmdHistoryIndex = state.cmdHistoryIndex
      cmdHistoryIndex--
      return { ...state, cmdHistoryIndex }

    case SET_CMD_HISTORY_INDEX:
      return { ...state, cmdHistoryIndex: action.index }

    case START_CMD: return { ...state, cmdRunning: true }
    case STOP_CMD: return { ...state, cmdRunning: false }

    default:
      return state
  }
}
