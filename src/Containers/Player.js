import React, { Component } from 'react'
import { CTX } from 'Contexts/Global'

import next from 'programs/player/next'
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
    this.props.setIsPlaying(true)
    this.updateTimecode = setInterval(() => {
      const { currentTime, duration } = this.player.audioEl
      this.props.setTimecode(currentTime, duration)
    }, 100)
  }

  handlePause = () => {
    this.props.setIsPlaying(false)
    clearInterval(this.updateTimecode)
  }

  handleEnded = () => {
    const { queue } = this.props

    if (!queue[0]) {
      this.props.playNextFromQueue()
      this.props.stdout('End of queue.')
    } else {
      next()
    }
  }

  // ==========================================================================

  render() {
    return <AudioPlayer
      src={this.props.nowPlaying && this.props.nowPlaying.url}
      ref={(el) => { this.player = el }}
    />
  }
}

export default () => <CTX component={Player} />
