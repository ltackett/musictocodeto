gulp           = require('gulp')
global.connect = require('gulp-connect')
config         = require('../config')

gulp.task 'serve', ['watchify'], (callback)->
  gulp.watch "app/index.html", ['copy_html']
  gulp.watch "app/images/**", ['copy_images']
  gulp.watch "app/fonts/**", ['copy_fonts']

  global.connect.server(
    root: config.dest
    livereload: true
  )

gulp.task 'connect-reload', (callback)->
  global.connect.reload()
