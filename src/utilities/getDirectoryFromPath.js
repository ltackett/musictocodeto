export default (fs, path) => {
  let directory = {}

  if (path === '/') {
    directory = fs
  } else {
    const pathSelector = path.replace('/', '.').slice(1).replace('.', '.contents.')
    directory = fs.contents[pathSelector]
  }

  directory.contentsKeys = Object.keys(directory.contents)
  return directory
}
