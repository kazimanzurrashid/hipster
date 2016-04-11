var gulp = require('gulp');
var util = require('gulp-util');

var appDirectory = './app';
var specDirectory = './specs';
var distDirectory = '/.dist';

var config = {
  indexHtmlFile: appDirectory + '/index.html',
  appJSFiles: [
    appDirectory + '/js/**/index.js',
    appDirectory + '/js/**/*.js'
  ],
  specJSFiles: [
    specDirectory + '/**/*.js'
  ],
  distDirectory: './dist/'
};

gulp.task('jscs', function() {
  var jscs = require('gulp-jscs');

  return gulp.src(config.appJSFiles.concat(config.specJSFiles))
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
  var jshint = require('gulp-jshint');

  return gulp.src(config.appJSFiles.concat(config.specJSFiles))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }));
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  return gulp.src(config.indexHtmlFile)
    .pipe(wiredep())
    .pipe(inject(gulp.src(config.appJSFiles, {base : 'app/js' })))
    .pipe(gulp.dest(config.distDirectory));
});

gulp.task('lint', ['jscs', 'jshint']);
