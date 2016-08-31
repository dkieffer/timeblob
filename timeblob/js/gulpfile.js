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
var Server = require('karma').Server;
var os = require('os');
const gs = gulp.series;
const gp = gulp.parallel;
var FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef());

const templateGlob = "components/**/*.html"

var jsGlob = ['app.js', './services/**/*.js', './components/**/*.js'];

var specGlob = jsGlob.concat(['./spec/**/*.js'])


gulp.task('makeTemplateJs', function() {
    var templateSrc = "{% load static from staticfiles %}\nvar TEMPLATE = {\n";
    return globby(templateGlob).then(function(entries) {
        entries.forEach(function(i) {
            var name = path.posix.basename(i, ".html");

            templateSrc += name.toUpperCase() + ": '{% static \"timeblob/ngtemplates/" + name + ".html\" %}',\n"
        })

        templateSrc += "}\n"
    }).then(function() {
        source('templates.js')
            .pipe(gulp_file("templates.js", templateSrc))
            .pipe(gulp.dest("../templates/timeblob")).on('error', function(err) {
                console.log(err);
            })
    })


})

gulp.task('makeTemplateTestJs', function() {
    var templateSrc = "var TEMPLATE = {\n";
    return globby(templateGlob).then(function(entries) {
        entries.forEach(function(i) {
            var name = path.posix.basename(i, ".html");

            templateSrc += name.toUpperCase() + ": 'timeblob/ngtemplates/" + name + ".html'\n"
        })

        templateSrc += "};\n"

        templateSrc += "var BASE_URL = 'http://BASEURL';\n"
    }).then(function() {
        source('templates.js')
            .pipe(gulp_file("templates.js", templateSrc))
            .pipe(gulp.dest("../../.jstest/"))
    })
})

gulp.task('templates', function() {
    return gulp.src(templateGlob)
        .pipe(flatten())
        .pipe(gulp.dest("../static/timeblob/ngtemplates")).on('error', function(err) {
            console.log(err);
        })
});


gulp.task('compileApp', function() {
    var bundledStream = through();

    bundledStream.pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(ngAnnotate())
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../static/timeblob/js'));
    // set up the browserify instance on a task basis

    globby(jsGlob).then(function(entries) {

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


gulp.task('test', gs('default', 'makeTemplateTestJs', function(done) {
    new Server({
        configFile: __dirname + '/karma.test.conf.js',
        singleRun: true
    }, done).start();

}))

gulp.task('watch',   gs('prepare-for-tests', gp('gulp-watch', 'js-watch'), (done) => done()));
//gulp.task('full-watch', , (done) => done()));
gulp.task('gulp-watch',  function() {
    return gulp.watch(specGlob, gs('prepare-for-tests'))
        .on('error', function(err) {
            console.log(err);
        })
});

gulp.task('js-watch', function(done) {
    var karmaConf = '/karma.conf.js';
    //you probably won't have chromium on darwin so let's assume Chrome
    if (os.platform == ' darwin') {
        karmaConf = '/karma.mac.conf.js';
    }
    new Server({
        configFile: __dirname + karmaConf
    }, done).start();
});


gulp.task('prepare-for-tests', gs('templates', 'compileApp', 'makeTemplateTestJs', (done) => done()));
gulp.task('default', gs('makeTemplateJs', 'templates', 'compileApp', (done) => done()));
