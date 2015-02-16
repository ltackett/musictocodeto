gulp       = require('gulp')
uglify     = require('gulp-uglify');
browserify = require('browserify')
watchify   = require('watchify')
source     = require('vinyl-source-stream')
reactify   = require('coffee-reactify')
connect    = require('gulp-connect')
config     = require('../config')

handleErrors = require('./handle_errors');

bundle = (bundler, outName) ->
  bundler.bundle()
    .on('error', handleErrors)
    .pipe(source(outName))
    .pipe(gulp.dest("#{config.dest}/javascripts"))
    .pipe(global.connect.reload())

bundler = (inPath, outName, watch=false) ->
  b = browserify(
    inPath,
    cache: {}, packageCache: {}, fullPaths: true,
    extensions: ['.coffee'],
    debug: true
  )

  b.transform(reactify)

  if watch
    b = watchify(b)
    b.on 'update', ()-> bundle(b, outName)

  bundle(b, outName)

gulp.task 'watchify', (callback) ->
  for inPath, outName of config.browserify
    bundler(inPath, outName, true)
  callback()

gulp.task 'browserify', (callback) ->
  for inPath, outName of config.browserify
    bundler(inPath, outName)
  callback()
