import React from 'react';
import { store } from 'store'
import { stdout } from 'modules/stdout/actions'

const { dispatch } = store
const R = React.Fragment // Alias React.Fragment for shorthand JSX preprocessing per line

const helpText = [
  'Basic usage:',
  '',
  'Getting a list of tracks from a user, and playing back a track',
  '--------------------------------------------------------------------------------',
  <R>&gt; {<em>usertracks [artist_slug]</em>} — eg. the user permalink {<em>daze-of-resistance</em>} would be my {<em>artist_slug</em>}</R>,
  <R>&gt; {<em>play [i]</em>} — you will receive a list of track from the {<em>usertracks</em>} program. {<em>play 0</em>} will play the first track from the list. Right now it only loads the first 50 tracks. Paging will come in a future version.</R>,
  '',
  'Getting a playlist from a user, and playing all tracks',
  '--------------------------------------------------------------------------------',
  <R>&gt; {<em>userplaylists [artist_slug]</em>} — similar to {<em>usertracks</em>}, this accepts a user permalink and returns a list of playlists.</R>,
  <R>&gt; {<em>play list [i]</em>} — similar to playing a track, this will playback a playlist.</R>,
  <R>&gt; {<em>play [i]</em>} — loading the playlist also loads it/s songs into the current context, so you can skip to any song in the list just as you would running {<em>play [i]</em>} after loading tracks from {<em>usertracks</em>}... though currently this stops the playlist from playing sequentially. I will fix that soon.</R>,
  '',
  'Player actions while audio is loaded',
  '--------------------------------------------------------------------------------',
  <R>&gt; <em>player play</em></R>,
  <R>&gt; <em>player pause</em></R>,
  <R>&gt; <em>player stop</em></R>,
  <R>&gt; <em>player rewind</em></R>,
  <R>&gt; <em>player skip [n]</em> — a positive or negative integer will skip through the audio by that many seconds.</R>,
  '',
  'This is a work-in-progress, so there are bound to be bugs. Hit me up on github issues and I\'ll try to tackle them as they come.',
  'Thanks for checking out my ridiculous little project!',
  '—Lorin',
]


const help = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(stdout(helpText))
  resolve()
});



export default help;
