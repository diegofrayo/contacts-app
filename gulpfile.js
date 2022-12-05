const gulp = require("gulp");
const gulpClean = require("gulp-clean");
const gulpCopy = require("gulp-copy");
const gulpSass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const fancyLog = require("fancy-log");
const path = require("path");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const watchify = require("watchify");

function buildJS(watch = true) {
	const browserifyInstance = browserify({
		basedir: ".",
		debug: true,
		entries: ["src/app.ts"],
		cache: {},
		packageCache: {},
	});

	return (
		watch === false ? browserifyInstance.plugin(tsify) : watchify(browserifyInstance.plugin(tsify))
	)
		.bundle()
		.on("error", fancyLog)
		.pipe(source("app.js"))
		.pipe(gulp.dest("./public/js"));
}

function buildCSS() {
	return gulp
		.src("./src/styles/app.scss")
		.pipe(gulpSass().on("error", gulpSass.logError))
		.pipe(gulp.dest("./public/css"));
}

function cleanJS() {
	return clean("js");
}

function copy() {
	return gulp
		.src(["./src/index.html", "./src/assets/**/*"])
		.pipe(gulpCopy("./public", { prefix: 1 }));
}

function buildProject() {
	return [
		function buildProject_clean() {
			return clean();
		},
		function buildProject_buildJS() {
			return buildJS(false);
		},
		buildCSS,
		copy,
	];
}

function watch() {
	gulp.watch("./src/**/*.scss", buildCSS);
	gulp.watch("./src/**/*.ts", buildJS);
}

exports.default = gulp.series(buildProject().concat([watch]));
exports.buildProject = gulp.series(buildProject());
exports.buildCSS = buildCSS;
exports.buildJS = gulp.series([cleanJS, buildJS]);
exports.cleanJS = cleanJS;
exports.copy = copy;

// --- Utils ---

function clean(folder = "") {
	return gulp
		.src(path.resolve("./public", folder), { read: false, allowEmpty: true })
		.pipe(gulpClean());
}
