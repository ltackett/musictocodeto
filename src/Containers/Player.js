import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  isPlaying,
  updateTimecode
} from 'modules/player/actions'

import AudioPlayer from 'react-audio-player'

class Player extends Component {
  componentDidMount() {
    const { audioEl } = this.player
    window.player = {}

    window.player.play = () => audioEl.play()
      .then((data) => console.log(data))
      .catch((err) => console.error(err))

    window.player.pause = () => audioEl.pause()

    audioEl.onplay = this.handlePlay
    audioEl.onpause = this.handlePause
  }

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

  render() {
    return <AudioPlayer
      src={this.props.nowPlaying && this.props.nowPlaying.url}
      autoPlay
      ref={(el) => { this.player = el }}
    />
  }
}

const mapStateToProps = state => ({
  nowPlaying: state.player.nowPlaying,
  position: state.player.position
})

export default connect(mapStateToProps, null)(Player)
