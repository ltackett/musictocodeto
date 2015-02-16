merge = require("./merge")

module.exports = ({api_wrapper}) ->
  userinfo: (artistSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{artistSlug}.json"

  usertracks: (artistSlug) ->
    api_wrapper
      method: "GET"
      path: "/users/#{artistSlug}/tracks.json?filter=all&order=created_at&order=original"

  play: (trackID) ->
    api_wrapper
      method: "GET"
      path: "/tracks/#{trackID}.json"

  streamURL: (url) -> api_wrapper(url)

