import getDirectoryFromPath from 'utilities/getDirectoryFromPath'
import getPlaylistsFromGenre from 'utilities/getPlaylistsFromGenre'

const ls = (cmdObject, { fs, path, stdout }) => new Promise((resolve, reject) => {
  console.log({ type: getDirectoryFromPath(fs, path).type });


  if (getDirectoryFromPath(fs, path).type === 'genre') {
    stdout(getPlaylistsFromGenre(fs, path))
  } else {
    stdout(getDirectoryFromPath(fs, path).contentsKeys)
  }

  return resolve()
});

export default ls;
