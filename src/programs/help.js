import React from 'react';

const helpText = [
  'Basic usage:',
  '',
  'Getting a list of tracks from a user, and playing back a track',
  '--------------------------------------------------------------------------------',
  (<span>&gt; {<em>usertracks [artist_slug]</em>} — eg. the user permalink {<em>daze-of-resistance</em>} would be my {<em>artist_slug</em>}</span>),
  (<span>&gt; {<em>play [i]</em>} — you will receive a list of track from the {<em>usertracks</em>} program. {<em>play 0</em>} will play the first track from the list. Right now it only loads the first 50 tracks. Paging will come in a future version.</span>),
  '',
  'Getting a playlist from a user, and playing all tracks',
  '--------------------------------------------------------------------------------',
  (<span>&gt; {<em>userplaylists [artist_slug]</em>} — similar to {<em>usertracks</em>}, this accepts a user permalink and returns a list of playlists.</span>),
  (<span>&gt; {<em>play list [i]</em>} — similar to playing a track, this will playback a playlist.</span>),
  (<span>&gt; {<em>play [i]</em>} — loading the playlist also loads it/s songs into the current context, so you can skip to any song in the list just as you would running {<em>play [i]</em>} after loading tracks from {<em>usertracks</em>}... though currently this stops the playlist from playing sequentially. I will fix that soon.</span>),
  '',
  'Player actions while audio is loaded',
  '--------------------------------------------------------------------------------',
  (<span>&gt; <em>player play</em></span>),
  (<span>&gt; <em>player pause</em></span>),
  (<span>&gt; <em>player stop</em></span>),
  (<span>&gt; <em>player rewind</em></span>),
  (<span>&gt; <em>player skip [n]</em> — a positive or negative integer will skip through the audio by that many seconds.</span>),
  '',
  'This is a work-in-progress, so there are bound to be bugs. Hit me up on github issues and I\'ll try to tackle them as they come.',
  'Thanks for checking out my ridiculous little project!',
  '—Lorin',
]


const help = (cmdObject) => new Promise((resolve, reject) => {
  resolve({ stdOut: helpText});
});

export default help;