gulp   = require('gulp')
sass   = require('gulp-sass')
config = require('../config')

gulp.task 'css', (callback) ->

  gulp.src(config.styles)
    .pipe(sass())
    .pipe(gulp.dest("#{config.dest}/stylesheets"))
    .pipe(global.connect.reload())

