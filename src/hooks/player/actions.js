import {
  IS_PLAYING,
  UPDATE_TIMECODE,

  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
  ADD_TRACK_TO_QUEUE,
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

  const setNowPlaying = (track) => dispatch({
    type: SET_NOW_PLAYING,
    track
  })

  const playNextFromQueue = () => dispatch({
    type: PLAY_NEXT_FROM_QUEUE
  })

  const addTrackToQueue = (track) => dispatch({
    type: ADD_TRACK_TO_QUEUE,
    track
  })

  return {
    setIsPlaying,
    setTimecode,
    setNowPlaying,
    playNextFromQueue,
    addTrackToQueue,
  }
}
