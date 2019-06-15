import fs from 'filesystem.json'

const getRandomPlaylist = () => {
  const playlists = Object.keys(fs.contents.playlists.contents)

  const playlistsWithPaths = playlists
    .filter(p => fs.contents.playlists.contents[p].path)
    .map(p => ({
      name: p,
      ...fs.contents.playlists.contents[p]
    }))

  const randomIndex = Math.floor(Math.random() * playlistsWithPaths.length)

  return playlistsWithPaths[randomIndex]
}

export default getRandomPlaylist
