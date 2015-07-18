var browserify = require('gulp-browserify'),
    Config = require('./gulpfile.config'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    path = require('path'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var config = new Config();

gulp.task('clean:dist', function (cb) {
    del([
        config.dist + '/*'
    ], cb);
});

gulp.task('browserify', function () {
    return gulp.src(config.browserifySrc)
        .pipe(browserify({
            standalone: config.browserifyStandalone
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('uglify', function() {
    return gulp.src(path.join(config.dist, config.lib))
        .pipe(uglify())
        .pipe(rename(config.minified))
        .pipe(gulp.dest(config.dist));
});

gulp.task('jshint', function() {
    return gulp.src([config.lib, 'test/*.js', 'Gruntfile.js'])
        .pipe(jshint({
            '-W083': true
        }));
});

gulp.task('eslint', function () {
    return gulp.src([config.lib])
        .pipe(eslint());
});

gulp.task('test', function () {
    return gulp.src(config.test, {read: false})
        .pipe(mocha());
});

gulp.task('default', function(cb) {
    runSequence('clean:dist', 'browserify', 'uglify', 'jshint', 'eslint', cb);
});