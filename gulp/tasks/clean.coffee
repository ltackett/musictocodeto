gulp   = require('gulp')
del    = require('del')
config = require('../config')

gulp.task 'clean', (cb) ->
  del([
    "#{config.dest}/images/**"
    "#{config.dest}/stylesheets/**"
    "#{config.dest}/javascripts/**"
  ], cb)
