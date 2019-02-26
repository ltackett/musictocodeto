import getDirectoryFromPath from 'utilities/getDirectoryFromPath'

const cd = ({ params }, { fs, path, setPath }) => new Promise((resolve, reject) => {
  // Nothing to do.
  // ==========================================================================
  if (!params[0]) {
    return resolve()
  }

  // Change directory to root
  // ==========================================================================
  if (params[0] === '/') {
    setPath('/')
    return resolve()
  }

  // Change directory to parent
  // ==========================================================================
  if (params[0] === '..' || params[0] === '../') {
    const pathArray = path.split('/')
    pathArray.pop()
    setPath(pathArray.length === 1 ? '/' : pathArray.join('/'))
    return resolve()
  }

  // Change directory to child of current path
  // ==========================================================================
  let newPath = '/'
  const currentDirectory = getDirectoryFromPath(fs, path).contentsKeys

  if (currentDirectory.includes(params[0])) {
    newPath = `${path === '/' ? '/' : `${path}/`}${params[0]}`
  } else {
    return reject({ error: 'Directory not found' })
  }

  setPath(newPath)
  return resolve()
});

export default cd;
