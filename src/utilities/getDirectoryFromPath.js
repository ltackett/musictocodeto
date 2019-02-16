export default (fs, path) => {
  let directory = fs

  if (path !== '/') {
    path.slice(1).split('/').forEach(node => {
      directory = directory.contents ? directory.contents[node] : directory[node]
    })
  }

  if (directory.contents) {
    directory.contentsKeys = Object.keys(directory.contents)
  }

  return directory
}
