const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps')
const htmlPartial = require('gulp-html-partial');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const ghPages = require('gulp-gh-pages');

sass.compiler = require('node-sass');



gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});

gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'));

});


// gulp.task('style:vendor', function () {
//     return gulp
//         .src([
//             './node_modules/bootstrap/dist/css/bootstrap.css'
//         ])
//         .pipe(concat('vendor.css'))
//         .pipe(gulp.dest('./build/css'));
// });

gulp.task('script', function(){
    return gulp.src([
        './scripts/components/**/*.js',
        './scripts/main.js',
    ])
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./build/js'));
});

// gulp.task('script:vendor', function () {
//     return gulp
//         .src([
//             './node_modules/jquery/dist/jquery.js',
//             './node_modules/bootstrap/dist/js/bootstrap.js',
//             './node_modules/@fortawesome/fontawesome-free/js/all.js'
//         ])
//         .pipe(uglify())
//         .pipe(concat('vendor.js'))
//         .pipe(gulp.dest('./build/js'));
// });

gulp.task('html', function (done) {
    gulp.src(['*.html'])
        .pipe(htmlPartial({
            basePath: 'html/'
        }))
        .pipe(gulp.dest('build'));

    done();
});


gulp.task('watch:sass', function () {
    gulp.watch('./build/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('watch:script', function () {
    gulp.watch('./build/scripts/**/*.js', gulp.series('script'));
});

gulp.task('watch', gulp.parallel('watch:script', 'watch:sass'));

gulp.task('default', gulp.series('sass', 'script', 'html'));