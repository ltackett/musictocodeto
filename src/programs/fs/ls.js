const ls = (cmdObject, { fs, path, stdout }) => new Promise((resolve, reject) => {
  const pathSelector = path.replace('/', '.').slice(1)
  stdout(Object.keys(pathSelector === '' ? fs : fs[pathSelector]))

  return resolve()
});

export default ls;
