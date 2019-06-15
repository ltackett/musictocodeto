const prev = (cmdObject, { playPreviousFromHistory }) => new Promise((resolve, reject) => {
  playPreviousFromHistory()
  return resolve({ command: 'play' })
});

export default prev;
