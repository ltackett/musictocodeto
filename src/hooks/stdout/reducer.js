import filesystem from 'filesystem.json'

import {
  ADD_LINE,
  ADD_LINES,
  CLEAR_SCREEN,

  ADD_TO_CMD_HISTORY,
  SET_CMD_HISTORY_INDEX,
  INCREMENT_CMD_HISTORY_INDEX,
  DECREMENT_CMD_HISTORY_INDEX,

  SET_BOOTING,
  SET_BOOTED,
  SET_PATH,
  START_CMD,
  STOP_CMD,
} from './constants'

const lineLimit = 150

export const initialState = {
  stdoutLines: [],
  cmdHistory: localStorage.cmdHistory ? JSON.parse(localStorage.cmdHistory) : [],
  cmdHistoryIndex: 0,
  isCmdRunning: false,
  isBooting: false,
  isBooted: false,
  path: localStorage.path ? localStorage.path : '/',
  fs: filesystem
}

// ============================================================================

export default (state = initialState, action) => {
  let stdoutLines, cmdHistory, cmdHistoryIndex

  switch (action.type) {
    case ADD_LINE:
      stdoutLines = [...state.stdoutLines]
      stdoutLines.push(action.line)
      if (stdoutLines.length > lineLimit) {
        stdoutLines = stdoutLines.slice(stdoutLines.length - lineLimit)
      }
      return { ...state, stdoutLines  }

    case ADD_LINES:
      stdoutLines = [...state.stdoutLines]
      stdoutLines = stdoutLines.concat(action.lines)
      if (stdoutLines.length > lineLimit) {
        stdoutLines = stdoutLines.slice(stdoutLines.length - lineLimit)
      }
      return { ...state, stdoutLines }

    case CLEAR_SCREEN:
      stdoutLines = []
      return { ...state, stdoutLines }

    case ADD_TO_CMD_HISTORY:
      cmdHistory = [...state.cmdHistory]
      cmdHistory.push(action.cmdObject)
      localStorage.setItem('cmdHistory', JSON.stringify(cmdHistory))
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

    case SET_BOOTING: return { ...state, isBooting: action.isBooting }
    case SET_BOOTED: return { ...state, isBooted: action.isBooted }
    case SET_PATH: return { ...state, path: action.path }
    case START_CMD: return { ...state, isCmdRunning: true }
    case STOP_CMD: return { ...state, isCmdRunning: false }

    default:
      return state
  }
}
