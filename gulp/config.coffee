module.exports =
  browserify:
    './app/javascripts/app.coffee' : 'app.js'
  styles: [
    './app/stylesheets/app.scss'
  ]
  dest: './build'
