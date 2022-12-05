const gulp = require("gulp");
const gulpClean = require("gulp-clean");
const gulpCopy = require("gulp-copy");
const gulpRename = require("gulp-rename");
const gulpSass = require("gulp-sass")(require("sass"));
const babelify = require("babelify");
const browserify = require("browserify");
const fancyLog = require("fancy-log");
const path = require("path");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const watchify = require("watchify");

function buildJSNonWatchify() {
	return buildJS(false);
}

function buildJSWatchify() {
	return buildJS(true);
}

function buildCSS() {
	return gulp
		.src("./src/styles/app.scss")
		.pipe(gulpSass().on("error", gulpSass.logError))
		.pipe(gulpRename("app.css"))
		.pipe(gulp.dest("./public/css"));
}

function copyAssets() {
	return gulp
		.src(["./src/index.html", "./src/assets/**/*"])
		.pipe(gulpCopy("./public", { prefix: 1 }));
}

function buildProject() {
	return [cleanProject, buildJSNonWatchify, buildCSS, copyAssets];
}

function watch() {
	gulp.watch("./src/**/*.scss", buildCSS);
	gulp.watch("./src/**/*.ts", buildJSWatchify);
}

exports.default = gulp.series([...buildProject(), watch]);
exports.buildCSS = gulp.series([cleanCSS, buildCSS]);
exports.buildJS = gulp.series([cleanJS, buildJSNonWatchify]);
exports.buildProject = gulp.series(buildProject());
exports.copyAssets = copyAssets;
exports.watch = watch;

// --- Utils ---

function cleanProject() {
	return clean();
}

function cleanJS() {
	return clean("js");
}

function cleanCSS() {
	return clean("css");
}

function clean(folder = "") {
	return gulp
		.src(path.resolve("./public", folder), { read: false, allowEmpty: true })
		.pipe(gulpClean());
}

function buildJS(watch) {
	const browserifyInstance = browserify({
		basedir: ".",
		debug: true,
		entries: ["src/app.ts"],
		cache: {},
		packageCache: {},
	})
		.plugin(tsify)
		.transform(babelify, { extensions: [".js", ".ts"] });

	return (watch === false ? browserifyInstance : watchify(browserifyInstance))
		.bundle()
		.on("error", fancyLog)
		.pipe(source("app.js"))
		.pipe(gulp.dest("./public/js"));
}
