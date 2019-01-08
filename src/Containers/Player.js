import React, { Component } from 'react';
import { connect } from 'react-redux'

import next from 'programs/player/next'

import {
  isPlaying,
  updateTimecode,
  playNextFromQueue,
} from 'modules/player/actions'

import {
  stdout
} from 'modules/stdout/actions'

import AudioPlayer from 'react-audio-player'

class Player extends Component {
  componentDidMount() {
    const beepbeep = new Audio('/beep-beep.mp3')
    beepbeep.play()

    const { audioEl } = this.player
    window.player = {}

    // Set internal Player API
    window.player.play = this.play
    window.player.pause = this.pause
    window.player.skip = this.skip

    // Set HTMLAudioElement event handlers
    audioEl.onplay = this.handlePlay
    audioEl.onpause = this.handlePause
    audioEl.onended = this.handleEnded
  }

  // Internal Player API
  // ==========================================================================

  play = () => {
    this.player.audioEl.play()
  }

  pause = () => {
    this.player.audioEl.pause()
  }

  skip = (skipBy) => {
    const { currentTime } = this.player.audioEl
    const seekTo = currentTime+skipBy

    this.player.audioEl.currentTime = seekTo
  }

  // HTMLAudioElement Event Handlers
  // ==========================================================================

  handlePlay = () => {
    const { dispatch } = this.props

    dispatch(isPlaying(true))
    this.updateTimecode = setInterval(() => {
      const { currentTime, duration } = this.player.audioEl
      dispatch(updateTimecode(currentTime, duration))
    }, 500)
  }

  handlePause = () => {
    this.props.dispatch(isPlaying(false))
    clearInterval(this.updateTimecode)
  }

  handleEnded = () => {
    const { dispatch, queue } = this.props

    if (!queue[0]) {
      dispatch(playNextFromQueue())
      dispatch(stdout('End of queue.'))
    } else {
      next()
    }
  }

  // ==========================================================================

  render() {
    return <AudioPlayer
      src={this.props.nowPlaying && this.props.nowPlaying.url}
      autoPlay
      ref={(el) => { this.player = el }}
    />
  }
}

const mapStateToProps = state => ({
  currentTime: state.player.currentTime,
  nowPlaying: state.player.nowPlaying,
  position: state.player.position,
  queue: state.player.queue,
})

export default connect(mapStateToProps, null)(Player)
