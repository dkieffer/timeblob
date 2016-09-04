var gulp = require('gulp');
var globby = require('globby')
var source = require('vinyl-source-stream');
var gulp_file = require('gulp-file');
const path = require('path');



module.exports = function(templateGlob, isTest) {

  var dest = isTest ? "../../.jstest/" : "../templates/timeblob"
  var templateSrc = ""
  if (!isTest){
    templateSrc += "{% load static from staticfiles %}\n"
  }
  templateSrc +="var TEMPLATE = {\n";

  return globby(templateGlob).then(function(entries) {
      entries.forEach(function(i) {
          var name = path.posix.basename(i, ".html");
          if (isTest)
          {
            templateSrc += name.toUpperCase() + ": 'timeblob/ngtemplates/" + name + ".html',\n"
          }
          else
          {
            templateSrc += name.toUpperCase() + ": '{% static \"timeblob/ngtemplates/" + name + ".html\" %}',\n"
          }
      })

      templateSrc += "}\n"
      if (isTest)
        templateSrc += "var BASE_URL = 'http://BASEURL';\n"
  }).then(function() {
      source('templates.js')
          .pipe(gulp_file("templates.js", templateSrc))
          .pipe(gulp.dest(dest)).on('error', function(err) {
              console.log(err);
          })
  })
}
