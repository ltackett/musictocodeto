import {
  IS_PLAYING,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
  PLAY_PREVIOUS_FROM_HISTORY,
  ADD_TRACK_TO_QUEUE,
  ADD_PLAYLIST_TO_QUEUE
} from './constants'

export const initialState = {
  nowPlaying: null,
  queue: [],
  history: [],
  position: 0,

  isPlaying: false,
}

// ============================================================================

export default (state = initialState, action) => {
  let nowPlaying, queue, history

  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.status
      }

    case SET_NOW_PLAYING:
      nowPlaying = action.track

      window.log(PLAY_NEXT_FROM_QUEUE, { action, nowPlaying, state })
      return {
        ...state,
        nowPlaying
      }

    case PLAY_NEXT_FROM_QUEUE:
      nowPlaying = [...state.queue][0] || null
      queue = [...state.queue]
      queue.shift()

      history = [...state.history]
      if (state.nowPlaying) {
        history.unshift(state.nowPlaying)
      }

      window.log(PLAY_NEXT_FROM_QUEUE, { action, queue, nowPlaying, state })
      return {
        ...state,
        nowPlaying,
        queue,
        history
      }

    case PLAY_PREVIOUS_FROM_HISTORY:
      nowPlaying = [...state.history][0] || null
      history = [...state.history]
      history.shift()

      queue = [...state.queue]
      if (state.nowPlaying) {
        queue.unshift(state.nowPlaying)
      }

      window.log(PLAY_PREVIOUS_FROM_HISTORY, { action, queue, nowPlaying, state })
      return {
        ...state,
        nowPlaying,
        queue
      }

    case ADD_TRACK_TO_QUEUE:
      queue = [...state.queue]
      queue.unshift(action.track)

      window.log(ADD_TRACK_TO_QUEUE, { action, queue, state })
      return {
        ...state,
        queue
      }

    case ADD_PLAYLIST_TO_QUEUE:
      queue = action.playlist

      window.log(ADD_PLAYLIST_TO_QUEUE, { action, queue, state })
      return {
        ...state,
        queue
      }

    default:
      return state
  }
}
