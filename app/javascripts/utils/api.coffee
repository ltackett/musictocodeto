merge = require("./merge")

module.exports = ({api_wrapper}) ->
  userinfo: (userSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{userSlug}.json"

  usertracks: (artistSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{artistSlug}/tracks.json?filter=all&order=created_at&order=original"

  track: (trackID) ->
    api_wrapper
      method: "GET"
      path: "/tracks/#{trackID}.json"

  userTrack: (userSlug, trackSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{userSlug}/tracks/#{trackSlug}.json"

  streamURL: (url) -> api_wrapper(url)

