import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import stdout from 'modules/stdout/reducer'
import player from 'modules/player/reducer'

export const stdoutPersistConfig = {
  key: 'stdout',
  blacklist: ['stdoutLines', 'cmdHistoryIndex', 'cmdRunning'],
  storage,
}

export default combineReducers({
  stdout: persistReducer(stdoutPersistConfig, stdout),
  player
})
