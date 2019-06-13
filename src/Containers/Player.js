import React, { Component } from 'react'
import { CTX } from 'Contexts/Global'

import play from 'programs/player/play'
import AudioPlayer from 'react-audio-player'
import ProgressBar from 'Components/ProgressBar';

class Player extends Component {
  state = {
    currentTime: 0,
    duration: 0,
  }

  componentDidMount() {
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
    const updateTimecode = () => {
      const { currentTime, duration } = this.player.audioEl
      this.setState({ currentTime, duration })
    }

    updateTimecode()
    this.throttledUpdateTimecode = setInterval(() => {
      updateTimecode()
    }, 250)
  }

  handlePause = () => {
    this.props.setIsPlaying(false)
    clearInterval(this.throttledUpdateTimecode)
  }

  handleEnded = () => {
    const { queue } = this.props

    if (!queue[0]) {
      window.log('End of queue.', { props: this.props})
      this.props.playNextFromQueue()
      this.props.stdout('End of queue.')
    } else {
      window.log('Playing next from queue', { props: this.props})
      this.props.playNextFromQueue()
      play({}, this.props)
    }
  }

  // ==========================================================================

  render() {
    return (
      <>
        <AudioPlayer
          src={this.props.nowPlaying && this.props.nowPlaying.url}
          ref={(el) => { this.player = el }}
        />

        {this.props.isPlaying &&
          <>
            <br />
            <ProgressBar currentTime={this.state.currentTime} duration={this.state.duration} />
          </>
        }
      </>
    )

  }
}

export default () => <CTX component={Player} />
