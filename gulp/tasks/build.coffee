gulp = require('gulp')
runSequence = require('run-sequence')

gulp.task 'build', (cb)->
  runSequence(
    'clean',
    'copy_html',
    'copy_images',
    'copy_fonts',
    ['browserify', 'css'],
    'autoprefixer',
    'uglify',
    cb
  )
