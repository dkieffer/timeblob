'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var babel = require('babelify');
var through = require('through2');
var globby = require('globby');
const path = require('path');
const gulp_file = require('gulp-file');
const flatten = require('gulp-flatten');
const jasmineBrowser = require('gulp-jasmine-browser');

const templateGlob = "components/**/*.html"

gulp.task('makeTemplateJs', function() {
  var templateSrc = "{% load static from staticfiles %}\nvar TEMPLATE = {\n";
  globby(templateGlob).then(function (entries) {
    entries.forEach(function(i ) {
      var name = path.posix.basename(i, ".html");

      templateSrc += name.toUpperCase() + ": '{% static \"timeblob/ngtemplates/"+  name + ".html\" %}',\n"
    })

    templateSrc += "}\n"
  }).then(function() {source('templates.js')
    .pipe(gulp_file("templates.js", templateSrc))
    .pipe(gulp.dest("../templates/timeblob")) });


})

gulp.task('templates', function() {
  gulp.src(templateGlob)
    .pipe(flatten())
    .pipe(gulp.dest("../static/timeblob/ngtemplates"))
});


gulp.task('compileApp', function () {
  var bundledStream = through();

   bundledStream.pipe(source('app.js'))
     .pipe(buffer())
     .pipe(sourcemaps.init({loadMaps: true}))
         .pipe(ngAnnotate())
         // Add transformation tasks to the pipeline here.
         .pipe(uglify())
         .on('error', gutil.log)
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('../static/timeblob/js'));
  // set up the browserify instance on a task basis

    globby(['app.js', './services/**/*.js', './components/**/*.js']).then(function(entries) {

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




// finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});

gulp.task('test',['default'], function () {

    gulp.src(['node_modules/angular-mocks/angular-mocks.js',
    '../templates/timeblob/templates.js',
      '../static/timeblob/js/app.js',
      'spec/**/*.js'])
      .pipe(jasmineBrowser.specRunner({console: true}))
      .pipe(jasmineBrowser.headless())
})

gulp.task('default', ['makeTemplateJs', 'templates', 'compileApp'], function () { });
