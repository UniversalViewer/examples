var c = require('../gulpfile.config');
var config = new c();
var gulp = require('gulp');
var utils = require('gulp-utils');
var path = require('path');

gulp.task('minify', function(cb){
    Promise.all([
        utils.minify(path.join(config.directories.dist, config.fileNames.jsOut), config.directories.dist)
    ]).then(function(){
        cb();
    });
});