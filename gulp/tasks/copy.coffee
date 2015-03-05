gulp   = require('gulp')
config = require('../config')

gulp.task 'copy_html', (callback)->
  gulp.src('./app/*.html')
    .pipe(gulp.dest("#{config.dest}"))
    .pipe(global.connect.reload())

gulp.task 'copy_images', (callback)->
  gulp.src('./app/images/**')
    .pipe(gulp.dest("#{config.dest}/images"))

gulp.task 'copy_fonts', (callback)->
  gulp.src('./app/fonts/**')
    .pipe(gulp.dest("#{config.dest}/fonts"))

gulp.task 'copy_vendor_js', (callback)->
  gulp.src('./app/javascripts/vendor/**')
    .pipe(gulp.dest("#{config.dest}/javascripts"))
