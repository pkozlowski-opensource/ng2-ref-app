var gulp = require('gulp');

var PATHS = {
    src: {
        js: 'src/**/*.ts',
        test: 'test/**/*.spec.ts',
        html: 'src/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/systemjs/dist/system-csp-production.js',
        'node_modules/angular2/bundles/angular2.min.js',
        'lib/ts-runtime.js'
    ],
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var sourcemaps = require('gulp-sourcemaps');

    var tsResult = gulp.src([PATHS.src.js, PATHS.typings])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            typescript: require('typescript'), //use the version of TypeScript from this repo
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            noEmitHelpers: true
        }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('play', ['libs', 'html', 'js'], function () {
    var httpPlay = require('http-play');

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    httpPlay({dist: __dirname + '/dist', port: 9000});
});
