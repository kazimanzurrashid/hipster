var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('jscs', function() {
  return gulp.src(['./app/**/*.js', './specs/**/*js'])
  .pipe(jscs())
  .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
  return gulp.src(['./app/**/*.js', './specs/**/*js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish', {
    verbose: true
  }));
});

gulp.task('lint', ['jscs', 'jshint']);
