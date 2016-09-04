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

var specGlob = jsGlob.concat(['./spec/**/*.js'])

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
gulp.task('compileApp', function() {
    return compilejs(jsGlob);
});

/* run karma once via the command line */
gulp.task('test', gs('default', 'makeTemplateTestJs', function(done) {
  return test(dirname, done);
}))

/* make changes to your app while it's running in karma */
gulp.task('watch',   gs('prepare-for-tests', gp('gulp-watch', 'js-watch'), (done) => done()));

/* looks for changes in the directories (including javascript files and then recompiles them*/
gulp.task('gulp-watch',  function() {
    return gulp.watch(specGlob, gs('prepare-for-tests'))
        .on('error', function(err) {
            console.log(err);
        })
});

/* looks for changes in teh app.js and updates as necessary. This is for handling spec testing */
gulp.task('js-watch', function(done) {
  return karmawatch(__dirname, done)
});



gulp.task('prepare-for-tests', gs('templates', 'compileApp', 'makeTemplateTestJs', (done) => done()));
gulp.task('default', gs('makeTemplateJs', 'templates', 'compileApp', (done) => done()));
