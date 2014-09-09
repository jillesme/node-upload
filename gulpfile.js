var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

/* GULP TASK: delete-images
 * Deletes all the uploaded images from the /u/ directory
 */
gulp.task('delete-images', function () {
  return del(['./public/dist/u/*', './public/src/u/*']);
});

/* GULP TASK: lint-JavaScript
 * Lints JavaScript files with jshint
 */
gulp.task('lint-javascript', function () {
  return gulp.src(['./app.js', './public/src/js/upload.js'])
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));
});

/* GULP TASK: compress-javascript
 * Uglifies all the (client side) JavaScript files
 */
gulp.task('compress-javascript', function () {
  return gulp.src('./public/src/js/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./public/dist/js/'));
});

/* GULP TASK: compile-sass
 * Compiles all sass to css
 */
gulp.task('compile-sass', function () {
  return gulp.src('./public/src/scss/*.scss')
          .pipe(sass({ outputStyle: 'compressed' }))
          .pipe(gulp.dest('./public/dist/css/'));
});

var tasks = [
  'delete-images',
  'lint-javascript',
  'compress-javascript',
  'compile-sass'
  ];

gulp.task('default', tasks);
