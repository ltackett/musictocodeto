const next = (cmdObject, { handleCommand, playNextFromQueue}) => new Promise((resolve, reject) => {
  playNextFromQueue()
  return resolve({ command: 'play' })
});

export default next;
