import {
  IS_PLAYING,
  UPDATE_TIMECODE,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
} from './constants'

export default (dispatch) => {
  const setIsPlaying = (status) => dispatch({
    type: IS_PLAYING,
    status
  })

  const setTimecode = (currentTime, duration) => dispatch({
    type: UPDATE_TIMECODE,
    currentTime,
    duration
  })

  const setNowPlaying = (url) => dispatch({
    type: SET_NOW_PLAYING,
    url
  })

  const playNextFromQueue = () => dispatch({
      type: PLAY_NEXT_FROM_QUEUE
  })

  return {
    setIsPlaying,
    setTimecode,
    setNowPlaying,
    playNextFromQueue,
  }
}
