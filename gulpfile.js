const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('test', () => {
 gulp.src(__dirname + '/test/test.js')
 .pipe(mocha())
})

gulp.task('lint', () => {
 gulp.src(__dirname + '/**.js')
   .pipe(lint())
   .pipe(lint.format())
});

gulp.watch(__dirname + '/**/**.js',['test','lint'])

gulp.task('default', ['test','lint'], () => {
  console.log('Ran Default');
});
