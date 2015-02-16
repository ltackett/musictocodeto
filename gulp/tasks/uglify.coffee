gulp   = require('gulp')
uglify = require('gulp-uglify')
to5    = require('gulp-6to5')
config = require('../config')

gulp.task '6to5', (callback) ->
  gulp.src("#{config.dest}/javascripts/app.js")
    .pipe(to5())
    .pipe(gulp.dest("#{config.dest}/javascripts/app.js"))

gulp.task 'uglify', (callback) ->
  gulp.src("#{config.dest}/javascripts/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("#{config.dest}/javascripts/app.min.js"))
