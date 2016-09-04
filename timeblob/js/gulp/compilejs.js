const through = require('through2');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var babel = require('babelify');
const globby = require('globby');
var browserify = require('browserify');
var gulp = require('gulp');

module.exports = function(jsGlob, filename, outputDest, done )
{
  var bundledStream = through();

  bundledStream.pipe(source(filename))
      .pipe(buffer())
      .pipe(sourcemaps.init({
          loadMaps: true
      }))
      .pipe(ngAnnotate())
      // Add transformation tasks to the pipeline here.
      .pipe(uglify({mangle: false, compress: false}))
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(outputDest))
      .on('end', () => done());
  // set up the browserify instance on a task basis

  globby(jsGlob).then(function(entries) {
      console.log(entries)
      var b = browserify({
          entries: entries,
          debug: true
      }).transform(babel.configure({
          // Use all of the ES2015 spec
          presets: ["es2015"]
      }))

      b.bundle().pipe(bundledStream);
  }).catch(function(err) {
      // ensure any errors from globby are handled
      bundledStream.emit('error', err);
  });





}
