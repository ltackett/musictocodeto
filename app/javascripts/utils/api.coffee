merge = require("./merge")

module.exports = ({api_wrapper}) ->
  user: (userSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{userSlug}.json"

  track: (trackID) ->
    api_wrapper
      method: "GET"
      path: "/tracks/#{trackID}.json"

  playlist: (playlistID) ->
    api_wrapper
      method: "GET"
      path: "/playlists/#{playlistID}.json"

  userTracks: (artistSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{artistSlug}/tracks.json?filter=all&order=created_at&order=original"

  userTrack: (userSlug, trackSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{userSlug}/tracks/#{trackSlug}.json"

  userPlaylists: (userSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{userSlug}/playlists.json"

  playlistByGenre: (tag) ->
    api_wrapper
      method: "GET"
      path: "/playlists.json?tags=#{tag}"

  streamURL: (url) -> api_wrapper(url)

