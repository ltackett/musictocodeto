require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'MTCT',
    description: 'Rock out with your grok out.',
    head: {
      titleTemplate: 'Music To Code To %s',
      meta: [
        {name: 'description', content: 'Rock out with your grok out.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Music To Code To'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'MTCT'},
        {property: 'og:description', content: 'Rock out with your grok out.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@ltackett'},
        {property: 'og:creator', content: '@ltackett'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
