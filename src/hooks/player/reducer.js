import {
  IS_PLAYING,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
  ADD_TRACK_TO_QUEUE,
} from './constants'

export const initialState = {
  nowPlaying: null,
  queue: [
    {
      url: 'http://music.lorintackett.com/audio/Lorin_Tackett_-_Smooth_Vintage.mp3',
      artist: 'Lorin Tackett',
      title: 'Smooth Vintage'
    }, {
      url: 'http://music.lorintackett.com/audio/lorintackett/lorin_tackett_-_lot.mp3',
      artist: 'Lorin Tackett',
      title: 'Lot'
    }
  ],
  history: [],
  position: 0,

  isPlaying: false,
}

// ============================================================================

export default (state = initialState, action) => {
  let nowPlaying, queue

  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.status
      }

    case SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.track
      }

    case PLAY_NEXT_FROM_QUEUE:
      nowPlaying = [...state.queue][0] || null
      queue = [...state.queue].splice(1, 1)

      return {
        ...state,
        nowPlaying,
        queue
      }

    case ADD_TRACK_TO_QUEUE:
      queue = [...state.queue]
      queue.shift(action.track)

      return {
        ...state,
        queue
      }

    default:
      return state
  }
}
