xhr   = require("./xhr")
merge = require("./merge")

apiRoot = "//api.soundcloud.com"
apiKey  = 'cfa2b68b053460c17008a1c1719b7c92'

formatURL = (options) ->
  if typeof options == 'string' then url = options
  if typeof options == 'object' then url = options.path

  if url.indexOf('?') >= 0 then separator = '&'
  else                          separator = '?'

  if typeof options == 'string' then return "#{options}#{separator}client_id=#{apiKey}"
  if typeof options == 'object' then return "#{apiRoot}#{options.path}#{separator}client_id=#{apiKey}"

module.exports = (config) -> (options) ->
  if typeof options == 'string' then return formatURL(options)
  if typeof options == 'object'
    headers = merge(
      options.headers || {},
      {}
    )

    xhr(
      merge(options,
        {
          url: formatURL(options)
          headers: headers
          data: (if (data = options.data)? then JSON.stringify(data))
        }
      )
    )

