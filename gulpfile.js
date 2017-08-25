const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const reload = browserSync.reload;



const SOURCEPATHS = {
  sassSource: 'src/scss/*.scss'
}
const APPPATH = {
  root: 'app/',
  css: 'app/css',
  js: 'app/js',
  scss: 'src/scss'
}


gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest(APPPATH.css));
});

gulp.task('serve', ['sass'], function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '*.js'], {
    server: {
      baseDir: APPPATH.root
    }
  })
});

gulp.task('watch', function () {
    gulp.watch(APPPATH.scss + '/*.scss', ['sass']);
});


gulp.task('default', ['watch', 'serve']);
