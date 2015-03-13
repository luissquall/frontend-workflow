// https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	filter = require('gulp-filter'),
	swig = require('gulp-swig'),
	reload = browserSync.reload;

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'swig'], function() {
	browserSync({
		server: "./",
		open: false
	});

	gulp.watch("scss/*.scss", ['sass']);
	gulp.watch("views/*.html", ['swig']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return sass('scss/', {sourcemap: true})
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: '/scss'
		}))
		.pipe(gulp.dest("css"))
		.pipe(filter('**/*.css'))
		.pipe(reload({stream: true}));
});

gulp.task('swig', function() {
	return gulp.src('./views/*.html')
		.pipe(swig({defaults: {cache: false}}))
		.pipe(gulp.dest('./'))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);