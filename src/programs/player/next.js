const next = (cmdObject, { playNextFromQueue}) => new Promise((resolve, reject) => {
  playNextFromQueue()
  return resolve({ command: 'play' })
});

export default next;
