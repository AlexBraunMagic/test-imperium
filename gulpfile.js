const {src, dest, parallel, series, watch } = require('gulp');


const scss         = require('gulp-sass')(require ('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
// const image        = require('gulp-image');
const del          = require('del');

function build(){
    return src([
        'app/images/**/*.*',
        'app/fonts/**/*.*',
        'app/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base:'app'})
    .pipe(dest('dist'));
}

function cleanDist(){
    return del('dist');
}

// function images() {
//     return src('app/images/**/*.*')
//         .pipe(image({
//             pngquant: true,
//             optipng: false,
//             zopflipng: true,
//             jpegRecompress: false,
//             mozjpeg: true,
//             gifsicle: true,
//             svgo: true,
//             concurrent: 10,
//             quiet: true // defaults to false
//         }))
//         .pipe(dest('dist/images'));
// }

function styles(){
    return src('app/scss/*.scss')
    .pipe(scss({outputStyle:'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserlist: ['last 10 version'],
         grid: true
    }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream());
}



function startwatch(){
    watch(['app/scss/**/*.scss'], styles);

    watch(['app/js/*.js', '!app/js/*.min.js'], scripts);

    watch(['app/*.html']).on('change', browserSync.reload);
}

function scripts(){
    return src([     
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream());

}

function browsersync(){
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    });
}


exports.styles      = styles;
exports.startwatch  = startwatch;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.cleanDist   = cleanDist;


exports.default = parallel(styles, scripts, browsersync, startwatch);
exports.build   = series(cleanDist, build);
