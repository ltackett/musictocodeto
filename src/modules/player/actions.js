import {
  IS_PLAYING,
  UPDATE_TIMECODE,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
} from './constants'

export const isPlaying = (status) => (dispatch) => dispatch({
  type: IS_PLAYING,
  status
})

export const updateTimecode = (currentTime, duration) => (dispatch) => dispatch({
  type: UPDATE_TIMECODE,
  currentTime,
  duration
})

export const setNowPlaying = (url) => (dispatch) => dispatch({
  type: SET_NOW_PLAYING,
  url
})

export const playNextFromQueue = () => (dispatch) => dispatch({
  type: PLAY_NEXT_FROM_QUEUE
})
