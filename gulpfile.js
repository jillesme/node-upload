var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

/* GULP TASK: clean
 * Deletes all the uploaded images from the /u/ directory
 */
gulp.task('clean', function () {
  del(['./public/dist']);
});

/* GULP TASK: jshint
 * Lints JavaScript files with jshint
 */
gulp.task('jshint', function () {
  return gulp.src([
    './app.js', './public/src/js/**/*.js',
    './routes/**/*.js', './utils/**/*.js'])
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));
});

/* GULP TASK: uglify
 * Uglifies all the (client side) JavaScript files
 */
gulp.task('uglify', function () {
  return gulp.src('./public/src/js/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./public/dist/js/'));
});

/* GULP TASK: sass
 * Compiles all sass to css
 */
gulp.task('sass', function () {
  return gulp.src('./public/src/scss/*.scss')
          .pipe(sass({ outputStyle: 'compressed' }))
          .on('error', handleError)
          .pipe(gulp.dest('./public/dist/css/'));
});

/* GULP TASK: copy
 * Compiles files needed
 */
gulp.task('copy', function () {
  return gulp.src('./public/src/favicon.ico')
          .pipe(gulp.dest('./public/dist/'));
});

/* GULP TASK: watch
 * Watch files for changes and run apropriate tasks
 */
gulp.task('watch', function () {
  gulp.watch('./public/src/js/*.js', ['jshint', 'uglify']);
  gulp.watch('./public/src/scss/*.scss', ['sass']);
});


gulp.task('default', ['watch', 'jshint', 'uglify', 'sass', 'copy']);

function handleError (error) {
  console.log('Error in \'' + error.plugin + '\'');
  console.log(error.message);
  this.emit('end');
}
