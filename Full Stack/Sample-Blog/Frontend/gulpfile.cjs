const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return src('src/Components/**/*.scss')  
        .pipe(sass().on('error', sass.logError))  
        .pipe(dest(file => file.base)); 
}

function watchTask() {
    watch(['src/Components/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
