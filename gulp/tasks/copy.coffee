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
