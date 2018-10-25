const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const jsonEditor = require('gulp-json-editor');
const htmlMin = require('gulp-htmlmin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');

const outputDir = 'dist';
const tsProject = typescript.createProject('tsconfig.json');

gulp.task('chrome', ['chrome:background', 'chrome:manifest']);

gulp.task('chrome:background', () => {
    return gulp.src('./src/chrome/background.ts')
        .pipe(tsProject())
        .pipe(gulp.dest(outputDir));
});

gulp.task('chrome:manifest', () => {
    const packageJson = JSON.parse(fs.readFileSync('./package.json'));

    return gulp.src('./manifest.json')
        .pipe(jsonEditor({
            version: packageJson.version,
        }))
        .pipe(gulp.dest(outputDir));
});



gulp.task('calculator', ['calculator:html', 'calculator:styles']);

gulp.task('calculator:html', () => {
    return gulp.src('./src/calculator/index.pug')
        .pipe(pug())
        .pipe(htmlMin({
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            html5: true,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('calculator:styles', ['calculator:styles:sanitize', 'calculator:styles:calculator']);

gulp.task('calculator:styles:sanitize', () => {
    return gulp.src('./node_modules/sanitize.css/sanitize.css')
        .pipe(cleanCss({
            level: 2,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('calculator:styles:calculator', () => {
    return gulp.src('./src/calculator/calculator.scss')
        .pipe(sass())
        .pipe(cleanCss({
            level: 2,
        }))
        .pipe(gulp.dest(outputDir));
});

gulp.task('default', ['calculator', 'chrome']);
