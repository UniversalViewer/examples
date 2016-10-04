var c = require('../gulpfile.config');
var config = new c();
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src(config.fileNames.test, {read: false})
        .pipe(mocha());
});