var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');

/* GULP TASK: delete-images
 * Deletes all the uploaded images from the /u/ directory
 */
gulp.task('delete-images', function () {
  return del(['./public/build/u/*', './public/source/u/*']);
});

/* GULP TASK: lint-JavaScript
 * Lints JavaScript files with jshint
 */
gulp.task('lint-javascript', function () {
  return gulp.src(['./app.js', './public/source/js/upload.js'])
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));
});

/* GULP TASK: compress-javascript
 * Uglifies all the (client side) JavaScript files
 */
gulp.task('compress-javascript', function () {
  return gulp.src('./public/source/js/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./public/build/js/'));
});

var tasks = [
  'delete-images',
  'lint-javascript',
  'compress-javascript'
  ];

gulp.task('default', tasks);
