import getDirectoryFromPath from 'utilities/getDirectoryFromPath'

const ls = (cmdObject, { fs, path, stdout }) => new Promise((resolve, reject) => {
  stdout(getDirectoryFromPath(fs, path).contentsKeys)
  return resolve()
});

export default ls;
