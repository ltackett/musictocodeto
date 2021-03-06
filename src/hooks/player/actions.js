import {
  IS_PLAYING,
  SET_NOW_PLAYING,
  PLAY_NEXT_FROM_QUEUE,
  PLAY_PREVIOUS_FROM_HISTORY,
  ADD_TRACK_TO_QUEUE,
  ADD_PLAYLIST_TO_QUEUE
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

  const playPreviousFromHistory = () => dispatch({
    type: PLAY_PREVIOUS_FROM_HISTORY
  })

  const addTrackToQueue = (track) => dispatch({
    type: ADD_TRACK_TO_QUEUE,
    track
  })

  const addPlaylistToQueue = (playlist) => dispatch({
    type: ADD_PLAYLIST_TO_QUEUE,
    playlist
  })

  return {
    setIsPlaying,
    setNowPlaying,
    playNextFromQueue,
    playPreviousFromHistory,
    addTrackToQueue,
    addPlaylistToQueue
  }
}
