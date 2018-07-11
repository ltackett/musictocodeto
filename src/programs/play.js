// import React from 'react';
import soundcloudAPI from '../utilities/soundcloudAPI'

const playText = [
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const play = (cmdObject) => new Promise((resolve, reject) => {
  resolve({ lines: playText});
});

export default play;
