import React from 'react'
import soundcloudAPI from 'utilities/soundcloudAPI'

import $ from 'utilities/theme'
import { Highlight as H } from 'Components/Styles'

const play = (cmdObject, props) => new Promise((resolve, reject) => {
  const { params } = cmdObject
  const { setNowPlaying, stdout, nowPlaying } = props

  // Attempt to play from soundcloud if there are two params passed in
  // ==========================================================================
  if (params && params.length === 2) {
    stdout('Getting song from soundcloud...')

    soundcloudAPI.resolve(`${params[0]}/${params[1]}`)
      .then(({data}) => {
        setNowPlaying({
          url: `${data.stream_url}?client_id=${soundcloudAPI.key}`,
          artist: data.user.username,
          title: data.title,
        })

        setTimeout(() => {
          window.player.play()
          stdout(
            <>
              <H color={$.cyan}>Now playing: </H>
              <H color={$.pink}>{data.user.username} - {data.title}</H>
            </>
          )
        }, 5);

        return resolve()
      })
      .catch(() => reject({ error: 'No song found.' }))

  // Attempt to play from queue
  // ==========================================================================
  } else if (nowPlaying !== null) {
    window.player.play()
    stdout(
      <>
        <H color={$.cyan}>Now playing: </H>
        <H color={$.pink}>{nowPlaying.artist} - {nowPlaying.title}</H>
      </>
    )
    return resolve()

  // Otherwise, nothing is loaded. Exit
  // ==========================================================================
  } else {
    window.player.pause()
    reject({ error: 'There is no song loaded.' })
  }
});

export default play;
