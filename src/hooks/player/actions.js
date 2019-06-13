import {
  IS_PLAYING,
  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
  ADD_TRACK_TO_QUEUE,
} from './constants'

export default (dispatch) => {
  const setIsPlaying = (status) => dispatch({
    type: IS_PLAYING,
    status
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
    setNowPlaying,
    playNextFromQueue,
    addTrackToQueue,
  }
}
