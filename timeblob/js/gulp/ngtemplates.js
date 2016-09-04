const gulp = require('gulp');
const flatten = require('gulp-flatten');


module.exports = function(templateGlob) {
  return gulp.src(templateGlob)
    .pipe(flatten())
    .pipe(gulp.dest("../static/timeblob/ngtemplates")).on('error', function(err) {
        console.log(err);
    })
  }
