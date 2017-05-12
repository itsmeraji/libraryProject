/**
 * Created by masikann on 3/6/17.
 */

var gulp = require('gulp');
var jade = require('gulp-jade');
var merge = require('gulp-merge');
var concat = require('gulp-concat');
var less = require('gulp-less');
var dust = require('gulp-dust');

// combine all page fragments
gulp.task('combineHTML', function(){
    return (
        merge(
            gulp.src('../../**/*-fragment.jade')
                .pipe(jade({pretty: true}))
            //,gulp.src('../**/*.html')
        )
        .pipe(gulp.dest('../../../target/'))
        .pipe(concat('combinedHTML.html'))
        .pipe(gulp.dest('../../../target/'))

    )
});

// convert less to css
gulp.task('convertToCSS', function(){
    return (
        gulp.src('../../styles/combined-styles.less')
            .pipe(less())
            .pipe(gulp.dest('../../../target/styles/'))
    )
});

// convert index jade to html
gulp.task('homePage', function() {
    return (
        gulp.src('../../*.jade')
            .pipe(jade())
            .pipe(gulp.dest('../../../target/'))
    )
});

// convert dust files to js
gulp.task('compileDust', function(){
    return(
        gulp.src('../**/*-template.html')
            .pipe(dust())
            .pipe(gulp.dest('../../../target/scripts/'))
    )
});

// copy all js files
gulp.task('copyJS', function(){
    return(
        gulp.src('../**/*.js')
            .pipe(gulp.dest('../../../target/scripts'))
    )
});

gulp.task('default', ['combineHTML', 'convertToCSS', 'homePage', 'compileDust', 'copyJS'], function(){
    console.log('started');
});