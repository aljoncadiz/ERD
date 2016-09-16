"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //run on local
var open = require('gulp-open'); //opens web browser
var browserify = require('browserify');//bundles js
var reactify = require('reactify');//transforms react jsx to js
var source = require('vinyl-source-stream')//use conventional text streams with gulp
var concat = require('gulp-concat');//concatenates files
var lint = require('gulp-eslint');// Lint JS files including JSX

var config = {
    port: 5115,
    devBaseUrl: 'http://localhost',
    paths:{
        html:'./src/*.html',
        js: './src/**.js',
        images: './src/images/*',
        css: [
            './src/css/*',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/jointjs/css/layout.css',
            'node_modules/bootstrap/dist/css/bootstrap-formhelpers.min.css',
            'node_modules/toastr/package/toastr.css',
            'node_modules/jointjs/css/**.css'
        ],
        dist: './dist',
        mainJS: './src/main.js'
    }
};


//start local server
gulp.task('connect',function(){
    connect.server({
        root:['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open',['connect'],function(){
    gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}))
});

gulp.task('html',function(){
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js',function(){
    browserify(config.paths.mainJS)
    .transform(reactify)
    .bundle()
    .on('error',console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload())
});

gulp.task('css',function(){
    gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload())
});

gulp.task('images',function(){
    gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint',function(){
   return gulp.src(config.paths.js)
   .pipe(lint({config: 'eslint.config.json'}))
   .pipe(lint.format());
});

gulp.task('watch',function(){
    gulp.watch(config.paths.html,['html']);
    gulp.watch(config.paths.js,['js','lint']);
});

gulp.task('default',['html','js','css','images','lint','open','watch']);
