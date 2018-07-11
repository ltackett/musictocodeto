// import React from 'react';
import soundcloudAPI from '../utilities/soundcloudAPI'
import { store } from '../store'
import { stdoutMultiline } from '../modules/stdout'

const { dispatch } = store

const lines = [
  `Soundcloud API Key: ${soundcloudAPI.key}`,
  `Soundcloud API Root: ${soundcloudAPI.root}`,
]

const play = (cmdObject) => new Promise((resolve, reject) => {
  dispatch(stdoutMultiline(lines))
  resolve()
});

export default play;
