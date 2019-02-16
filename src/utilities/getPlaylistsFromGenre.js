export default (fs, path) => {
  const pathArray = path.slice(1).split('/')
  const genre = pathArray[pathArray.length - 1]
  const playlists = Object.keys(fs.contents.playlists.contents)
  const playlistsFromGenre = playlists.filter(p => fs.contents.playlists.contents[p].genre === genre)
  return playlistsFromGenre
}
