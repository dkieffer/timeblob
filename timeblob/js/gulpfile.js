'use strict';

var gulp = require('gulp');
const gs = gulp.series;
const gp = gulp.parallel;


var FwdRef = require('undertaker-forward-reference');

var makeTemplate = require("./gulp/maketemplate");
var ngTemplates = require("./gulp/ngtemplates")
var compilejs = require('./gulp/compilejs')
var karmawatch = require('./gulp/karmawatch');
var test = require('./gulp/test')


var templateGlob = "components/**/*.html";

gulp.registry(FwdRef());


var jsGlob = ['app.js', './services/**/*.js', './components/**/*.js'];


var specGlob = ['./spec/**/*.js']
var jsAndSpecGlob = jsGlob.concat(specGlob);

var htmlJsGlob = jsGlob.concat(['./components/**/*.html'])

/*We make the template.js file so we can reference the angular component html
files via an identifier instead of paths */
gulp.task('makeTemplateJs', function() {
  return makeTemplate(templateGlob, false);
})

/* Same as makeTemplateJs but only used by Karma for spec tests*/
gulp.task('makeTemplateTestJs', function() {
  return makeTemplate(templateGlob, true);
})

/* copies the angular templates to the static folder for django*/
gulp.task('templates', function() {
    return ngTemplates(templateGlob);
});

/* compiles all of the javascript files for the application */
gulp.task('compileApp', function(done) {
    return compilejs(jsGlob, 'app.js', '../static/timeblob/js', done);
});

/* compiles all of the javascript files PLUS the spec files */
gulp.task ('compileAppWithSpec', gs('compileApp', function (done) {
  return compilejs(specGlob, 'spec.js', '../../.jstest', done)
}))

/* run karma once via the command line */
gulp.task('test', gs( 'compileAppWithSpec', 'makeTemplateTestJs', function(done) {
  return test(__dirname,  done);
}))

/* make changes to your app while it's running in karma */
gulp.task('watch',   gs('default', 'app-watch'), (done) => done());

/* looks for changes in the (including javascript files and then recompiles them*/



/** use this when you want to run in karma */
gulp.task(
  'karma-watch',
    gs('compileAppWithSpec',
      'makeTemplateTestJs',
      gp('spec-watch', 'js-watch', (done) => done()),
     (done) => done()));

/* looks for changes in teh app.js and updates as necessary. This is for handling spec testing */
gulp.task('js-watch', function(done) {
  return karmawatch(__dirname, done)
});

gulp.task('spec-watch',  function() {
    return gulp.watch(jsAndSpecGlob, gs('compileAppWithSpec'))
        .on('error', function(err) {
            console.log(err);
        })
});

/* watches all the app files and recompiles as necessary, used when you're doing runserver from the Makefile*/
gulp.task('app-watch',() => {
  return gulp.watch(htmlJsGlob, gs('default'))
    .on('error', function(err) {
        console.log(err);
    })
  }
)



gulp.task('prepare-for-tests', gs('templates', 'compileApp', 'makeTemplateTestJs', (done) => done()));

gulp.task('default', gs('makeTemplateJs', 'templates', 'compileApp', (done) => done()));
