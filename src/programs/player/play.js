import React from 'react'
import soundcloudAPI from 'utilities/soundcloudAPI'
import getRandomPlaylist from 'utilities/getRandomPlaylist';

import $ from 'utilities/theme'
import { Highlight as H, Error as E } from 'Components/Styles'

const play = (cmdObject, props) => new Promise((resolve, reject) => {
  const { params } = cmdObject
  const { setNowPlaying, stdout, nowPlaying, addPlaylistToQueue, playNextFromQueue } = props

  // Attempt to play from soundcloud if there are two params passed in
  // ==========================================================================
  if (params && params.length === 2) {
    stdout('Getting song from soundcloud...')

    soundcloudAPI.resolve(`${params[0]}/${params[1]}`)
      .then(({ data }) => {
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
    window.mixpanel.track('Playing', { type: 'track', track: `${nowPlaying.artist} - ${nowPlaying.title}` })

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

    stdout(<E>There are no songs in the queue.</E>)
    const playlist = getRandomPlaylist()
    stdout('Loading a new playlist...')

    soundcloudAPI.resolve(playlist.path)
      .then(({ data }) => {
        window.log('Playlist loaded from SoundCloud', { data, props })
        window.mixpanel.track('Playing', { type: 'playlist', playlist: data.title })

        stdout(`Loaded playlist: ${data.title}`)
        stdout(data.tracks.map((t, i) => <><H>[{i+1}]</H> {t.user.username} - {t.title}</>))

        const tracks = data.tracks.map(t => ({
          url: `${t.stream_url}?client_id=${soundcloudAPI.key}`,
          artist: t.user.username,
          title: t.title,
        }))

        addPlaylistToQueue(tracks)
        stdout(
          <>
            <H color={$.cyan}>Now playing: </H>
            <H color={$.pink}>{tracks[0].artist} - {tracks[0].title}</H>
          </>
        )

        setTimeout(() => {
          playNextFromQueue()
          window.player.play()
        }, 5);
        return resolve()
      })
      .catch((err) => {
        console.log(err)
        reject({ error: 'Could not load playlist' })
      })

  }
});

export default play;
