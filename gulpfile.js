var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');

/* GULP TASK: clean
 * Deletes all the uploaded images from the /u/ directory
 */
gulp.task('clean', function () {
  del(['./public/dist/u/*', '!./public/dist/u/.uploadfolder']);
  del(['./public/dist/t/*', '!./public/dist/t/.uploadfolder']);
});

/* GULP TASK: jshint
 * Lints JavaScript files with jshint
 */
gulp.task('jshint', function () {
  return gulp.src(['./app.js', './public/src/js/upload.js', './public/src/js/overview.js'])
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
          .pipe(autoprefixer({
            browsers: [
            'ios 7',
            'last 2 Explorer versions',
            'last 3 Chrome versions',
            'last 3 Firefox versions'
            ],
            cascade: false
          }))
          .pipe(gulp.dest('./public/dist/css/'));
});

/* GULP TASK: watch
 * Watch files for changes and run apropriate tasks
 */
gulp.task('watch', function () {
  gulp.watch('./public/src/js/*.js', ['jshint', 'uglify']);
  gulp.watch('./public/src/scss/*.scss', ['sass']);
});

/* GULP TASK: run-app
 * Runs app.js and monitors for changes to restart app.js
 */
gulp.task('run-app', function () {
  return nodemon({
    script: './app.js',
    ext: 'js hjs',
    ignore: ['gulpfile.js', 'upload.js']
  });
});

gulp.task('default', ['run-app', 'watch', 'jshint', 'uglify', 'sass']);

function handleError (error) {
  console.log('Error in \'' + error.plugin + '\'');
  console.log(error.message);
  this.emit('end');
}
