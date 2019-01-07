import {
  IS_PLAYING,
  UPDATE_TIMECODE,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE
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
  currentTime: 0,
  duration: 0,
}

// ============================================================================

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.status
      }

    case UPDATE_TIMECODE:
      return {
        ...state,
        currentTime: action.currentTime,
        duration: action.duration,
      }

    case SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.nowPlaying
      }

    case PLAY_NEXT_FROM_QUEUE:
      const nowPlaying = [...state.queue][0] || null
      const queue = [...state.queue].splice(1, 1)

      return {
        ...state,
        nowPlaying,
        queue
      }

    default:
      return state
  }
}
