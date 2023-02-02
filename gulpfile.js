const gulp         = require('gulp');// Подключаем Gulp
const less 		   = require('gulp-less');
const browserSync  = require('browser-sync').create(); // Подключаем Browser Sync
const concat       = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const uglify       = require('gulp-uglify'); // Подключаем gulp-uglifyjs (для сжатия JS)
const rename       = require('gulp-rename');
const cleanCSS     = require('gulp-clean-css');
const del          = require('del'); // Подключаем библиотеку для удаления файлов и папок
const autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов
const cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
const imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const imagPngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png


const jsFile =['app/lib/jquery-3.3.1.min.js', 
'app/lib/parallax.min.js',
'app/lib/scrollreveal.js',
'app/lib/slick.min.js',
'app/js/script.js'
];

gulp.task('less', function() {
	return gulp.src('app/less/**/*.less') // Берем источник
	       .pipe(less ())// Преобразуем less в CSS посредством gulp-less
	       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
            .pipe(cleanCSS({
                level: 2
           }))
           .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	       .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
	       .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('scripts', function() {
    return gulp.src(jsFile)
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify({
            toplevel: true
        })) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
        .pipe(browserSync.stream()); //перезагружаем страницу
});


gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});



gulp.task('watch', function(){
    gulp.watch('app/less/**/*.less', gulp.parallel('less'));
    gulp.watch(['app/js/script.js', 'app/lib/**/*.js'], gulp.parallel('scripts'));
    gulp.watch('app/*.html', gulp.parallel('code'));
});

//-------------------продакшен-------------------//

gulp.task('img', function() {
	return gulp.src('app/images/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imagPngquant()]
		})))
		.pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

	var buildCss = gulp.src( // Переносим библиотеки в продакшен
		'app/css/main.min.css'
		)
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/libs.min.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));


});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default',gulp.parallel('less','scripts','browser-sync','watch'));
gulp.task('build', gulp.parallel('prebuild', 'clear', 'img', 'less', 'scripts'));