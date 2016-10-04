var c = require('../gulpfile.config');
var config = new c();
var gulp = require('gulp');
var utils = require('gulp-utils');
var path = require('path');

gulp.task('copy:typings', function() {
    return gulp.src(path.join(config.directories.typings, config.fileNames.dtsOut)).pipe(gulp.dest(config.directories.dist));
});