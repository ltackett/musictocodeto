const cd = ({ params }, { fs, path, setPath }) => new Promise((resolve, reject) => {
  if (params[0] === '..' || params[0] === '../') {
    const pathArray = path.split('/')
    pathArray.pop()
    setPath(pathArray.join('/'))
    return resolve()
  }

  if (path === '/') {
    setPath(`/${params[0]}`)
  } else {
    setPath(`${path}/${params[0]}`)
  }

  return resolve()
});

export default cd;
