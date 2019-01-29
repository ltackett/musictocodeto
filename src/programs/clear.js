const next = (cmdObject, { clearScreen }) => new Promise((resolve, reject) => {
  clearScreen()
  return resolve()
});

export default next;
