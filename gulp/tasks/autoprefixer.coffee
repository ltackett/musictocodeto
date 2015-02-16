gulp       = require('gulp')
postcss    = require('gulp-postcss')
sourcemaps = require('gulp-sourcemaps')
autoprefix = require('autoprefixer-core')
config     = require('../config')

# Auto-prefix CSS3 properties based on caniuse.com

gulp.task 'autoprefixer', (callback) ->
  gulp.src("#{config.dest}/stylesheets/app.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefix({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("#{config.dest}/stylesheets"))
    .pipe(global.connect.reload())