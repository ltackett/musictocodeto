import axios from 'axios'

const apiRoot = '//api.soundcloud.com'
const apiKey = process.env.REACT_APP_SOUNDCLOUD_API_KEY || ''

const api = axios.create({
  baseURL: apiRoot,
  params: {
    client_id: apiKey
  }
})

export default {
  root: apiRoot,
  key: apiKey,

  paths: {
    resolve: (url) => api.get(`${apiRoot}/resolve`, {
      params: {
        url: `http://soundcloud.com/${url}`
      }
    }),
  }
}
