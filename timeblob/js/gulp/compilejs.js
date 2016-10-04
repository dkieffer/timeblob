const through = require('through2');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
const globby = require('globby');
var browserify = require('browserify');
var gulp = require('gulp');
var tsify = require('tsify');

module.exports = function(tsGlob, filename, outputDest, done )
{
  var bundledStream = through();

  bundledStream.pipe(source(filename))
      .pipe(buffer())
      .pipe(sourcemaps.init({
          loadMaps: true
      }))
      .pipe(ngAnnotate())
      // Add transformation tasks to the pipeline here.
      //.pipe(uglify({mangle: false, compress: false}))
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(outputDest))
      .on('end', () => done());
  // set up the browserify instance on a task basis
  globby(tsGlob).then(function(entries) {
      console.log(entries)
      var b = browserify({
          entries: entries,
          debug: true
      })
      .plugin(tsify, {  project:'../../../tsconfig.json', sourceMap:true})
      //.plugin(tsify)

      b.bundle().pipe(bundledStream);
  }).catch(function(err) {
      // ensure any errors from globby are handled
      bundledStream.emit('error', err);
  });





}
