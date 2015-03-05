gulp = require('gulp')
runSequence = require('run-sequence')

gulp.task 'build', (cb)->
  runSequence(
    'clean',
    'copy_html',
    'copy_images',
    'copy_fonts',
    'copy_vendor_js',
    ['browserify', 'css'],
    'autoprefixer',
    'uglify',
    cb
  )
