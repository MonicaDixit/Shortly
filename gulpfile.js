var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    path = require('path'),
    env = require('gulp-env'),
    supertest = require('supertest');


gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('test', function() {
    env({vars: {ENV: 'Test'}});
    gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))
});

gulp.task('watch-test', function() {
    gulp.run('test');
    gulp.watch(['./**/*.js', 'test/**/*.js'], ['test']);
    
});

gulp.task('test-debug', function () {
    var spawn = require('child_process').spawn;
    spawn('node', [
      '--debug-brk',
      path.join(__dirname, 'node_modules/gulp/bin/gulp.js'),
      'test'
    ], { stdio: 'inherit' });
  });

