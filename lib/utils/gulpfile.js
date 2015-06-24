var browserify = require('gulp-browserify'),
    Config = require('./gulpfile.config'),
    config = new Config(),
    del = require('del'),
    eventStream = require('event-stream'),
    gulp = require('gulp'),
    merge = require('merge2'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence'),
    tasks = requireDir('./tasks'),
    ts = require('gulp-typescript');

gulp.task('build', function() {
    var tsResult = gulp.src(['src/*.ts', 'typings/*.ts', '!test'])
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            module: 'amd',
            sortOutput: true,
            out: config.out
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(config.dist)),
        tsResult.js.pipe(gulp.dest(config.dist))
    );
});

gulp.task('browserify', function (cb) {
    return gulp.src(['./*.js'], { cwd: config.dist })
        .pipe(browserify({
            transform: ['deamdify'],
            standalone: config.standalone
        }))
        .pipe(rename(config.out))
        .pipe(gulp.dest(config.dist));
});

gulp.task('test', function () {
    return gulp.src(config.test, {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('clean:dist', function (cb) {
    del([
        config.dist + '/*'
    ], cb);
});
//
//gulp.task('build', function() {
//
//    var tsResult = gulp.src(['src/*.ts', 'typings/*.ts', '!test'])
//        .pipe(ts({
//            declarationFiles: true,
//            noExternalResolve: true,
//            noLib: false,
//            module: 'amd',
//            standalone: config.out
//        }));
//
//    return merge([
//        tsResult.dts.pipe(gulp.dest(config.dist)),
//        tsResult.js.pipe(gulp.dest(config.dist))
//    ]);
//});

gulp.task('default', function(cb) {
    runSequence('clean:dist', 'build', 'bump', cb);
});